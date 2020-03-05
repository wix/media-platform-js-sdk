import * as fs from 'fs';
import * as Stream from 'stream';

import { RawResponse } from '../../types/response/response';
import { dummyLogger, Logger } from '../../utils/deprecated/logger';
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
        contentType: string;
      };
    };

export interface UploadFileParams<T = any> {
  path: string;
  file: T;
  uploadFileRequest?: UploadFileRequest;
  uploadToken?: string;
  uploadUrl?: string;
  version?: string;
  logger?: Logger;
}

interface NodeUploadFileParams
  extends UploadFileParams<string | Buffer | Stream> {}

export interface IFileUploader {
  configuration: IConfigurationBase;
  httpClient: IHTTPClient;

  getUploadUrl(
    uploadUrlRequest?: IUploadUrlRequest,
  ): Promise<UploadUrlResponse>;

  getUploadConfiguration(
    uploadConfigurationRequest?: IUploadConfigurationRequest,
    version?: string,
  ): Promise<UploadUrlResponse>;

  uploadFile(
    path: string,
    file: any,
    uploadRequest?: UploadFileRequest,
    uploadToken?: string,
    uploadUrl?: string,
    version?: string,
  );
  uploadFile(uploadParams: UploadFileParams);

  uploadFileV3(
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
  public apiUrlV2: string;
  public apiUrlV3: string;

  constructor(
    public configuration: Configuration,
    public httpClient: HTTPClient,
  ) {
    this.apiUrl = 'https://' + configuration.domain + '/_api/upload';
    this.apiUrlV2 = 'https://' + configuration.domain + '/_api/v2/upload';
    this.apiUrlV3 = 'https://' + configuration.domain + '/_api/v3/upload';
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
   * @param version
   */
  getUploadConfiguration(
    uploadConfigurationRequest?: IUploadConfigurationRequest,
    version: string = 'v2',
  ): Promise<UploadUrlResponse> {
    const apiUrl = version === 'v3' ? this.apiUrlV3 : this.apiUrlV2;
    return this.httpClient
      .post<RawResponse<IUploadConfigurationResponse>>(
        apiUrl + '/configuration',
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
   * @description upload a file (v3)
   * @param {string} path the destination to which the file will be uploaded
   * @param {string|Buffer|Stream} file can be one of: string - path to file, memory buffer, stream
   * @param {UploadFileRequest?} uploadFileRequest
   * @param {string?} uploadToken
   * @param {string?} uploadUrl
   */
  uploadFileV3(
    path: string,
    file: string | Buffer | Stream,
    uploadFileRequest?: UploadFileRequest,
    uploadUrl?: string,
  ) {
    return this.uploadFile(
      path,
      file,
      uploadFileRequest,
      undefined,
      uploadUrl,
      'v3',
    );
  }

  private doUploadFile({
    path,
    file,
    uploadFileRequest,
    uploadToken,
    uploadUrl,
    version = 'v2',
    logger = dummyLogger,
  }: NodeUploadFileParams) {
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

    const uploadConfigurationRequest = this.createUploadConfigurationRequest(
      path,
      size,
      uploadFileRequest,
    );
    logger.debug(
      `uploadConfigurationRequest: ${JSON.stringify(
        uploadConfigurationRequest,
      )}`,
    );

    let uploadConfiguration: Promise<UploadUrlResponse>;

    if (uploadToken && uploadUrl) {
      uploadConfiguration = Promise.resolve({
        uploadToken,
        uploadUrl,
      });
    } else {
      uploadConfiguration = this.getUploadConfiguration(
        uploadConfigurationRequest,
        version,
      );
    }

    uploadConfiguration.then(response => {
      logger.debug(`uploadConfigurationResponse: ${JSON.stringify(response)}`);
    });

    return Promise.race([uploadConfiguration, streamErrorPromise])
      .then((response: UploadConfigurationResponse) => {
        if (
          !response.uploadUrl ||
          (version === 'v2' && !response.uploadToken)
        ) {
          return Promise.reject('No `getUploadUrl` response');
        }

        const uploadConfigurationResponse = response as UploadConfigurationResponse;

        const form = {
          ...this.createUploadForm(stream, path, uploadConfigurationResponse),
          ...uploadFileRequest,
        };

        logger.debug(
          `Uploading file to ${uploadConfigurationResponse.uploadUrl}`,
        );
        return this.uploadFileWithPost(
          uploadConfigurationResponse.uploadUrl,
          form,
        );
      })
      .then(({ payload }) => {
        logger.debug('Upload complete');
        return [new FileDescriptor(payload)];
      });
  }

  uploadFile(uploadParams: NodeUploadFileParams): Promise<FileDescriptor[]>;
  uploadFile(
    path: string,
    file: string | Buffer | Stream | File,
    uploadRequest?: UploadFileRequest,
    uploadToken?: string,
    uploadUrl?: string,
    version?: string,
  ): Promise<FileDescriptor[]>;

  /**
   * @description upload a file
   * @param {string} path the destination to which the file will be uploaded
   * @param {string|Buffer|Stream} file can be one of: string - path to file, memory buffer, stream
   * @param {UploadFileRequest?} uploadFileRequest
   * @param {string?} uploadToken
   * @param {string?} uploadUrl
   * @param {version?} version - can be v2 or v3
   */
  uploadFile(
    path: string | NodeUploadFileParams,
    file?: any, // it's defined in overload types
    uploadFileRequest?: UploadFileRequest,
    uploadToken?: string,
    uploadUrl?: string,
    version: string = 'v2',
  ) {
    if (typeof path === 'object') {
      return this.doUploadFile(path);
    }
    return this.doUploadFile({
      path,
      file,
      uploadFileRequest,
      uploadToken,
      version,
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
      uploadToken?: string | null;
    } & Partial<UploadFileRequest> = {
      file: stream,
      path,
    };

    if (typeof uploadResponse.uploadToken !== 'undefined') {
      form.uploadToken = uploadResponse.uploadToken;
    }

    return form;
  }

  private getStreamErrorPromise(stream: UploadFileStream) {
    return new Promise((resolve, reject) => {
      (stream as Stream).once('error', error => {
        reject(error);
      });
    });
  }

  private normalizeStream(
    file: string | Buffer | Stream,
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
      size = file.byteLength;
      stream = {
        value: file,
        options: {
          filename: 'filename',
          contentType: mimeType,
        },
      };
    } else {
      throw new Error('unsupported source type: ' + typeof file);
    }

    return { size, stream, streamErrorPromise };
  }
}
