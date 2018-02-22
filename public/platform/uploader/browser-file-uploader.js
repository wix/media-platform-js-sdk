import {UploadUrlResponse} from '../../../src/platform/management/responses/upload-url-response';
import {UploadJob} from './upload-job';

/**
 * @param {Configuration} configuration
 * @param {HTTPClient} browserHTTPClient
 * @constructor
 */

class FileUploader {
  constructor(configuration, browserHTTPClient) {
    /**
     * @type {string}
     */
    this.uploadUrlEndpoint = 'https://' + configuration.domain + '/_api/upload/url';

    /**
     * @type {HTTPClient}
     */
    this.browserHTTPClient = browserHTTPClient;
  }

  /**
   * retrieve a pre signed URL to which the file is uploaded
   * @param {UploadUrlRequest?} uploadUrlRequest
   * @param {function(Error, UploadUrlResponse)} callback
   */
  getUploadUrl(uploadUrlRequest, callback) {
    this.browserHTTPClient.request('GET', this.uploadUrlEndpoint, uploadUrlRequest, null, function (error, body) {
      if (error) {
        callback(error, null);
        return;
      }

      callback(null, new UploadUrlResponse(body.payload));
    });
  }

  /**
   * @description upload a file
   * @param {string} path the destination to which the file will be uploaded
   * @param {File} file
   * @param {UploadFileRequest?} uploadFileRequest
   * @returns {UploadJob}
   */
  uploadFile(path, file, uploadFileRequest) {
    var uploadJob = new UploadJob(path, file, uploadFileRequest);

    return uploadJob.run(this);
  }
}

/**
 * @type {FileUploader}
 */
export default FileUploader;
export {FileUploader};
