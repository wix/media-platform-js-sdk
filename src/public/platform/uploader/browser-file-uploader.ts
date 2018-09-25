import {IFileUploader} from '../../../platform/management/file-uploader';
import {UploadFileRequest} from '../../../platform/management/requests/upload-file-request';
import {IUploadUrlRequest} from '../../../platform/management/requests/upload-url-request';
import {UploadUrlResponse} from '../../../platform/management/responses/upload-url-response';
import {RawResponse} from '../../../types/response/response';
import {Configuration} from '../configuration/configuration';
import {HTTPClient} from '../http/browser-http-client';

import {UploadJob} from './upload-job';


export class FileUploader implements IFileUploader {
  public uploadUrlEndpoint: string;
  public httpClient: HTTPClient;

  constructor(public configuration: Configuration, public browserHTTPClient: HTTPClient) {
    this.uploadUrlEndpoint = 'https://' + configuration.domain + '/_api/upload/url';
    // To match the implement
    this.httpClient = browserHTTPClient;
  }

  /**
   * Retrieve a pre signed URL to which the file is uploaded
   */
  getUploadUrl(uploadUrlRequest?: IUploadUrlRequest): Promise<UploadUrlResponse> {
    return this.browserHTTPClient
      .get<RawResponse<UploadUrlResponse>>(this.uploadUrlEndpoint, uploadUrlRequest)
      .then((body) => {
        return body.payload;
      }, (error) => {
        return Promise.reject(error);
      });
  }

  /**
   * @description upload a file
   * @param {string} path the destination to which the file will be uploaded
   * @param {File} file
   * @param {UploadFileRequest?} uploadFileRequest
   * @returns {UploadJob}
   */
  uploadFile(path: string, file: File, uploadFileRequest?: UploadFileRequest) {
    const uploadJob = new UploadJob({
      path,
      file,
      uploadFileRequest
    });

    return uploadJob.run(this);
  }
}
