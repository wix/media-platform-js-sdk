import * as fs from 'fs';
import * as Stream from 'stream';

import { RawResponse } from '../../types/response/response';
import {
  Configuration,
  IConfigurationBase,
} from '../configuration/configuration';
import { HTTPClient, IHTTPClient } from '../http/http-client';

import { FileDescriptor, IFileDescriptor } from './metadata/file-descriptor';
import { UploadFileRequest } from './requests/upload-file-request';
import { IUploadUrlRequest } from './requests/upload-url-request';
import {
  IUploadUrlResponse,
  UploadUrlResponse,
} from './responses/upload-url-response';
import {
  IUploadConfigurationRequest,
  UploadConfigurationRequest,
} from './requests/upload-configuration-request';
import {
  IUploadConfigurationResponse,
  UploadConfigurationResponse,
} from './responses/upload-configuration-response';

export type UploadFileStream =
  | Stream
  | {
      value: Buffer;
      options: {
        filename: 'filename';
      };
    };

export interface IFileUploader {
  configuration: IConfigurationBase;
  httpClient: IHTTPClient;

  getUploadUrl(
    uploadUrlRequest?: IUploadUrlRequest,
  ): Promise<UploadUrlResponse>;

  getUploadConfiguration(
    uploadConfigurationRequest?: IUploadConfigurationRequest,
  ): Promise<UploadUrlResponse>;

  uploadFile(
    path: string,
    file: string | Buffer | Stream | File,
    uploadRequest?: UploadFileRequest,
  );
}

/**
 * @param {Configuration} configuration
 * @param {HTTPClient} httpClient
 * @constructor
 */
export class FileUploader implements IFileUploader {
  public apiUrl: string;
  public apiUrlV2: string;

  constructor(
    public configuration: Configuration,
    public httpClient: HTTPClient,
  ) {
    this.apiUrl = 'https://' + configuration.domain + '/_api/upload';
    this.apiUrlV2 = 'https://' + configuration.domain + '/_api/v2/upload';
  }

  /**
   * @deprecated
   * @description retrieve a signed URL to which the file is uploaded
   * @param uploadUrlRequest
   */
  getUploadUrl(
    uploadUrlRequest?: IUploadUrlRequest,
  ): Promise<UploadUrlResponse> {
    return this.httpClient
      .get<RawResponse<IUploadUrlResponse>>(
        this.apiUrl + '/url',
        uploadUrlRequest,
      )
      .then(
        response => {
          return new UploadUrlResponse(response.payload);
        },
        error => {
          return Promise.reject(error);
        },
      );
  }

  /**
   * @description retrieve upload configuration for uploading files
   * @param uploadConfigurationRequest
   */
  getUploadConfiguration(
    uploadConfigurationRequest?: IUploadConfigurationRequest,
  ): Promise<UploadUrlResponse> {
    return this.httpClient
      .post<RawResponse<IUploadConfigurationResponse>>(
        this.apiUrlV2 + '/configuration',
        uploadConfigurationRequest,
      )
      .then(
        response => {
          return new UploadConfigurationResponse(response.payload);
        },
        error => {
          return Promise.reject(error);
        },
      );
  }

  /**
   * @description upload a file
   * @param {string} path the destination to which the file will be uploaded
   * @param {string|Buffer|Stream} file can be one of: string - path to file, memory buffer, stream
   * @param {UploadFileRequest?} uploadFileRequest
   */
  uploadFile(
    path: string,
    file: string | Buffer | Stream,
    uploadFileRequest?: UploadFileRequest,
  ) {
    let stream, size, streamErrorPromise;

    try {
      ({ stream, size, streamErrorPromise } = this.normalizeStream(file));
    } catch (error) {
      return Promise.reject(error);
    }

    const uploadConfigurationRequest = this.createUploadConfigurationRequest(
      path,
      size,
      uploadFileRequest,
    );

    return Promise.race([
      this.getUploadConfiguration(uploadConfigurationRequest),
      streamErrorPromise,
    ])
      .then(
        response => {
          if (
            !(response as UploadConfigurationResponse).uploadToken ||
            !(response as UploadConfigurationResponse).uploadUrl
          ) {
            return Promise.reject('No `getUploadUrl` response');
          }

          const uploadConfigurationResponse = response as UploadConfigurationResponse;

          const form = {
            ...this.createUploadForm(stream, path, uploadConfigurationResponse),
            ...uploadFileRequest,
          };

          return this.uploadFileWithPost(
            uploadConfigurationResponse.uploadUrl,
            form,
          );
        },
        error => {
          return Promise.reject(error);
        },
      )
      .then(({ payload }) => {
        return [new FileDescriptor(payload)];
      });
  }

  private createUploadConfigurationRequest(
    path: string,
    size,
    uploadFileRequest: UploadFileRequest | undefined,
  ) {
    let acl, mimeType;

    if (uploadFileRequest) {
      ({ acl, mimeType } = uploadFileRequest);
    }

    return new UploadConfigurationRequest({
      path,
      size,
      acl,
      mimeType,
    });
  }

  private uploadFileWithPost(uploadUrl: string, form) {
    return this.httpClient.postForm<RawResponse<IFileDescriptor>>(
      uploadUrl,
      form,
    );
  }

  private createUploadForm(stream, path: string, uploadResponse) {
    const form: {
      file: UploadFileStream;
      path: string;
      uploadToken: string | null;
    } & Partial<UploadFileRequest> = {
      file: stream,
      path,
      uploadToken: uploadResponse.uploadToken,
    };

    return form;
  }

  private getStreamErrorPromise(stream: UploadFileStream) {
    return new Promise((resolve, reject) => {
      (stream as Stream).once('error', error => {
        reject(error);
      });
    });
  }

  private normalizeStream(file: string | Buffer | Stream) {
    let stream: UploadFileStream;
    let size: number | null = null;

    let streamErrorPromise = new Promise(() => {
      // empty function
    }); // never resolving;

    if (file instanceof Stream && typeof file.pipe === 'function') {
      stream = file;
      streamErrorPromise = this.getStreamErrorPromise(stream);
    } else if (typeof file === 'string') {
      try {
        size = fs.statSync(file).size;
      } catch (error) {
        throw error;
      }

      stream = fs.createReadStream(file);
      streamErrorPromise = this.getStreamErrorPromise(stream);
    } else if (file instanceof Buffer) {
      // noinspection JSUnresolvedVariable
      size = file.byteLength;
      stream = {
        value: file,
        options: {
          filename: 'filename',
        },
      };
    } else {
      throw new Error('unsupported source type: ' + typeof file);
    }

    return { size, stream, streamErrorPromise };
  }
}
