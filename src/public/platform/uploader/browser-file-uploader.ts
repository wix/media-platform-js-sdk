import {
  IFileUploader,
  UploadFileParams,
} from '../../../platform/management/file-uploader';
import { UploadFileRequest } from '../../../platform/management/requests/upload-file-request';
import { IUploadUrlRequest } from '../../../platform/management/requests/upload-url-request';
import { UploadUrlResponse } from '../../../platform/management/responses/upload-url-response';
import { RawResponse } from '../../../types/response/response';
import { Logger } from '../../../utils/deprecated/logger';
import { Configuration } from '../configuration/configuration';
import { HTTPClient } from '../http/browser-http-client';

import { UploadJob } from './upload-job';
import { IUploadConfigurationRequest } from '../../../platform/management/requests/upload-configuration-request';

interface BrowserUploadFileParams extends UploadFileParams<File> {}

export class FileUploader implements IFileUploader {
  public uploadUrlEndpoint: string;
  public uploadConfigurationEndpoint: string;
  public httpClient: HTTPClient;

  constructor(
    public configuration: Configuration,
    public browserHTTPClient: HTTPClient,
  ) {
    this.uploadUrlEndpoint =
      'https://' + configuration.domain + '/_api/upload/url';
    this.uploadConfigurationEndpoint =
      'https://' + configuration.domain + '/_api/v2/upload/configuration';

    // To match the implement
    this.httpClient = browserHTTPClient;
  }

  /**
   * @deprecated
   * Retrieve a pre signed URL to which the file is uploaded
   */
  getUploadUrl(
    uploadUrlRequest?: IUploadUrlRequest,
  ): Promise<UploadUrlResponse> {
    return this.browserHTTPClient
      .get<RawResponse<UploadUrlResponse>>(
        this.uploadUrlEndpoint,
        uploadUrlRequest,
      )
      .then(
        (body) => {
          return body.payload;
        },
        (error) => {
          return Promise.reject(error);
        },
      );
  }

  /**
   * @description get upload configuration
   * @param uploadConfigurationRequest
   * @returns Promise<UploadUrlResponse>
   */
  getUploadConfiguration(
    uploadConfigurationRequest?: IUploadConfigurationRequest,
  ): Promise<UploadUrlResponse> {
    return this.browserHTTPClient
      .post<RawResponse<UploadUrlResponse>>(
        this.uploadConfigurationEndpoint,
        uploadConfigurationRequest,
      )
      .then(
        (body) => {
          return body.payload;
        },
        (error) => {
          return Promise.reject(error);
        },
      );
  }

  private doUploadFile({
    path,
    file,
    uploadToken,
    version,
    uploadFileRequest,
    uploadUrl,
  }: BrowserUploadFileParams): UploadJob {
    const uploadJob = new UploadJob({
      file,
      path,
      uploadFileRequest,
      uploadToken,
      uploadUrl,
    });

    return uploadJob.run(this);
  }

  uploadFile(uploadParams: BrowserUploadFileParams): UploadJob;
  uploadFile(
    path: string,
    file: File,
    uploadRequest?: UploadFileRequest,
    uploadToken?: string,
    uploadUrl?: string,
    version?: string,
  ): UploadJob;

  /**
   * @description upload a file
   * @param {string} path the destination to which the file will be uploaded
   * @param {File} file
   * @param {UploadFileRequest?} uploadFileRequest
   * @param {string?} uploadToken
   * @param {string?} uploadUrl
   * @param {string?} version
   * @returns {UploadJob}
   */
  uploadFile(
    path: string | BrowserUploadFileParams,
    file?: any,
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
      uploadUrl,
      uploadFileRequest,
      uploadToken,
      version,
    });
  }

  /**
   * @description upload a file
   * @param {string} path the destination to which the file will be uploaded
   * @param {File} file
   * @param {UploadFileRequest?} uploadFileRequest
   * @param {string?} uploadToken
   * @param {string?} uploadUrl
   * @returns {UploadJob}
   */
  uploadFileV3(
    path: string,
    file: File,
    uploadFileRequest?: UploadFileRequest,
    uploadToken?: string,
    uploadUrl?: string,
  ) {
    // unsupported
    return null;
  }
}
