var QueuedFileUploader = require('./queued-file-uploader');
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
 * @param {function(Error, {uploadUrl: string}|null)} callback
 */
FileUploader.prototype.getUploadUrl = function (mediaType, callback) {
    this.browserHTTPClient.request('GET', this.uploadUrlEndpoint, {}, null, function (error, body) {
        if (error) {
            callback(error, null);
            return;
        }

        callback(null, {
            uploadToken: body.payload.uploadToken,
            uploadUrl: body.payload.uploadUrl
        })
    })
};

FileUploader.prototype.uploadFile = function (file, fileDescriptor, callback) {
    var upload = new UploadJob(fileDescriptor, file);

    return upload.run(this);
};

/**
 * @type {FileUploader}
 */
module.exports = FileUploader;