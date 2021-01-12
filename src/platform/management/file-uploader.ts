import * as fs from 'fs';
import * as Stream from 'stream';

import { RawResponse } from '../../types/response/response';
import { dummyLogger } from '../../utils/deprecated/logger';
import {
  Configuration,
  IConfigurationBase,
} from '../configuration/configuration';
import { HTTPClient, IHTTPClient } from '../http/http-client';

import { FileDescriptor, IFileDescriptor } from './metadata/file-descriptor';
import { UploadFileRequest } from './requests/upload-file-request';
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
  | Buffer;

export interface IFileUploader {
  configuration: IConfigurationBase;
  httpClient: IHTTPClient;

  getUploadConfiguration(
    uploadConfigurationRequest?: IUploadConfigurationRequest,
  ): Promise<UploadConfigurationResponse>;

  uploadFile(
    path: string,
    file: string | Buffer | Stream | File,
    uploadRequest?: UploadFileRequest,
    uploadUrl?: string,
  );
}

/**
 * @param {Configuration} configuration
 * @param {HTTPClient} httpClient
 * @constructor
 */
export class FileUploader implements IFileUploader {
  public apiUrl: string;

  constructor(
    public configuration: Configuration,
    public httpClient: HTTPClient,
    private readonly logger = dummyLogger,
  ) {
    this.apiUrl = 'https://' + configuration.domain + '/_api/v3/upload';
  }

  /**
   * @description retrieve upload configuration for uploading files
   * @param uploadConfigurationRequest
   */
  getUploadConfiguration(
    uploadConfigurationRequest?: IUploadConfigurationRequest,
  ): Promise<UploadConfigurationResponse> {
    return this.httpClient
      .post<RawResponse<IUploadConfigurationResponse>>(
        this.apiUrl + '/configuration',
        uploadConfigurationRequest,
      )
      .then(
        (response) => {
          return new UploadConfigurationResponse(response.payload);
        },
        (error) => {
          return Promise.reject(error);
        },
      );
  }

  /**
   * @description upload a file (v3)
   * @param {string} path the destination to which the file will be uploaded
   * @param {string|Buffer|Stream} file can be one of: string - path to file, memory buffer, stream
   * @param {UploadFileRequest?} uploadFileRequest
   * @param {string?} uploadUrl
   */
  uploadFile(
    path: string,
    file: string | Buffer | Stream | File,
    uploadFileRequest?: UploadFileRequest,
    uploadUrl?: string,
  ) {
    let stream, size, streamErrorPromise;
    const mimeType = uploadFileRequest?.mimeType || undefined;

    try {
      ({ stream, size, streamErrorPromise } = this.normalizeStream(
        file,
        mimeType,
      ));
    } catch (error) {
      return Promise.reject(error);
    }

    const uploadConfigurationRequest = FileUploader.createUploadConfigurationRequest(
      path,
      size,
      uploadFileRequest,
    );
    this.logger.debug(
      `uploadConfigurationRequest: ${JSON.stringify(
        uploadConfigurationRequest,
      )}`,
    );

    let uploadConfiguration: Promise<UploadConfigurationResponse>;

    if (uploadUrl) {
      uploadConfiguration = Promise.resolve({
        uploadUrl,
      });
    } else {
      uploadConfiguration = this.getUploadConfiguration(
        uploadConfigurationRequest,
      );
    }

    uploadConfiguration
      .then((response) => {
        this.logger.debug(
          `uploadConfigurationResponse: ${JSON.stringify(response)}`,
        );
      })
      .catch((error) => {
        this.logger.error(
          `uploadConfigurationResponse: ${JSON.stringify(error)}`,
        );
      });

    return Promise.race([uploadConfiguration, streamErrorPromise])
      .then((response: UploadConfigurationResponse) => {
        if (!response.uploadUrl) {
          return Promise.reject('No `getUploadConfiguration` response');
        }

        const uploadConfigurationResponse = response as UploadConfigurationResponse;

        this.logger.debug(
          `Uploading file to ${uploadConfigurationResponse.uploadUrl}`,
        );

        return this.uploadFileWithPut(
          uploadConfigurationResponse.uploadUrl,
          stream,
          uploadFileRequest,
        );
      })
      .then(({ payload }) => {
        this.logger.debug('Upload complete');
        return [new FileDescriptor(payload)];
      });
  }

  private static createUploadConfigurationRequest(
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

  private uploadFileWithPut(
    uploadUrl: string,
    stream,
    uploadFileRequest?: UploadFileRequest,
  ) {
    const contentType =
      uploadFileRequest?.mimeType || 'application/octet-stream';
    const params: { [key: string]: string } = {};

    if (uploadFileRequest?.acl) {
      params.acl = uploadFileRequest.acl;
    }

    if (uploadFileRequest?.lifecycle) {
      params.lifecycle = uploadFileRequest.lifecycle;
    }

    if (uploadFileRequest?.fileName) {
      params.fileName = uploadFileRequest.fileName;
    }

    return this.httpClient.putFile<RawResponse<IFileDescriptor>>(
      uploadUrl,
      stream,
      params,
      { 'content-type': contentType },
    );
  }

  private getStreamErrorPromise(stream: UploadFileStream) {
    return new Promise((resolve, reject) => {
      (stream as Stream).once('error', (error) => {
        reject(error);
      });
    });
  }

  private normalizeStream(
    file: string | Buffer | Stream | File,
    mimeType: string = 'application/octect-stream',
  ) {
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
      stream = file;
    } else {
      throw new Error('unsupported source type: ' + typeof file);
    }

    return { size, stream, streamErrorPromise };
  }
}
