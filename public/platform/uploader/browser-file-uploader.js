var UploadUrlResponse = require('../../../src/platform/management/responses/upload-url-response');
var UploadJob = require('./upload-job');


/**
 * @param {Configuration} configuration
 * @param {HTTPClient} browserHTTPClient
 * @constructor
 */
function FileUploader(configuration, browserHTTPClient) {
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
FileUploader.prototype.getUploadUrl = function (uploadUrlRequest, callback) {
    this.browserHTTPClient.request('GET', this.uploadUrlEndpoint, uploadUrlRequest, null, function (error, body) {
        if (error) {
            callback(error, null);
            return;
        }

        callback(null, new UploadUrlResponse(body.payload))
    })
};

/**
* @description upload a file
* @param {string} path the destination to which the file will be uploaded
* @param {File} file
* @returns {UploadJob}
*/
FileUploader.prototype.uploadFile = function (path, file) {
    var uploadJob = new UploadJob(path, file);

    return uploadJob.run(this);
};

/**
 * @type {FileUploader}
 */
module.exports = FileUploader;