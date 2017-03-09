var UploadUrlResponse = require('../../../src/platform/management/responses/upload-url-response');
var UploadJob = require('./upload-job');


/**
 * @param configuration
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
 * @param {string} mediaType
 * @param {function(Error, UploadUrlResponse)} callback
 */
FileUploader.prototype.getUploadUrl = function (mediaType, callback) {
    this.browserHTTPClient.request('GET', this.uploadUrlEndpoint, {}, null, function (error, body) {
        if (error) {
            callback(error, null);
            return;
        }

        callback(null, new UploadUrlResponse(body.payload))
    })
};

/**
 * @param {string} path
 * @param {File} file
 * @returns {UploadJob}
 */
FileUploader.prototype.uploadFile = function (path, file) {
    var upload = new UploadJob(path, file);

    return upload.run(this);
};

/**
 * @type {FileUploader}
 */
module.exports = FileUploader;