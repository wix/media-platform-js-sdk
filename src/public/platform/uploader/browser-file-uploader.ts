import { IFileUploader } from '../../../platform/management/file-uploader';
import { UploadFileRequest } from '../../../platform/management/requests/upload-file-request';
import { RawResponse } from '../../../types/response/response';
import { Configuration } from '../configuration/configuration';
import { HTTPClient } from '../http/browser-http-client';

import { UploadJob } from './upload-job';
import { IUploadConfigurationRequest } from '../../../platform/management/requests/upload-configuration-request';
import { UploadConfigurationResponse } from '../../../platform/management/responses/upload-configuration-response';

export class FileUploader implements IFileUploader {
  public uploadConfigurationEndpoint: string;
  public httpClient: HTTPClient;

  constructor(
    public configuration: Configuration,
    public browserHTTPClient: HTTPClient,
  ) {
    this.uploadConfigurationEndpoint =
      'https://' + configuration.domain + '/_api/v3/upload/configuration';

    // To match the implement
    this.httpClient = browserHTTPClient;
  }

  /**
   * @description get upload configuration
   * @param uploadConfigurationRequest
   * @returns Promise<UploadUrlResponse>
   */
  getUploadConfiguration(
    uploadConfigurationRequest?: IUploadConfigurationRequest,
  ): Promise<UploadConfigurationResponse> {
    return this.browserHTTPClient
      .post<RawResponse<UploadConfigurationResponse>>(
        this.uploadConfigurationEndpoint,
        uploadConfigurationRequest,
      )
      .then(
        body => {
          return body.payload;
        },
        error => {
          return Promise.reject(error);
        },
      );
  }

  /**
   * @description upload a file
   * @param {string} path the destination to which the file will be uploaded
   * @param {File} file
   * @param {UploadFileRequest?} uploadFileRequest
   * @param {string?} uploadUrl
   * @returns {UploadJob}
   */
  uploadFile(
    path: string,
    file: File,
    uploadFileRequest?: UploadFileRequest,
    uploadUrl?: string,
  ) {
    const uploadJob = new UploadJob({
      file,
      path,
      uploadFileRequest,
      uploadUrl,
    });

    return uploadJob.run(this);
  }
}
