import {UploadUrlResponse} from '../../../platform/management/responses/upload-url-response';
import {UploadJob} from './upload-job';
import {Configuration} from '../configuration/configuration';
import {HTTPClient} from '../http/browser-http-client';
import {UploadFileRequest} from '../../../platform/management/requests/upload-file-request';
import {IFileUploader} from '../../../platform/management/file-uploader';
import {IUploadUrlRequest, UploadUrlRequest} from '../../../platform/management/requests/upload-url-request';


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
  getUploadUrl(uploadUrlRequest: IUploadUrlRequest | undefined, callback): Promise<UploadUrlResponse> {
    return this.browserHTTPClient
      .get<{ payload: UploadUrlResponse }>(this.uploadUrlEndpoint, uploadUrlRequest)
      .then((body) => {
        callback(null, new UploadUrlResponse(body.payload));
        return body.payload;
      }, (error) => {
        callback(error, null);
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
    const uploadJob = new UploadJob(path, file, uploadFileRequest);

    return uploadJob.run(this);
  }
}

