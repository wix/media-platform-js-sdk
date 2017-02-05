/**
 * @param configuration
 * @param {HTTPClient} browserHTTPClient
 * @constructor
 */
function FileUploader(configuration, browserHTTPClient) {

    this.uploadUrlEndpoint = 'https://' + configuration.domain + '/_api/upload/url';
    
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

        callback(null, { uploadUrl: body.uploadUrl})
    })
};

// TODO: implement: FileUploader.prototype.uploadFile = function (path, file, uploadRequest, callback)

/**
 * @type {FileUploader}
 */
module.exports = FileUploader;