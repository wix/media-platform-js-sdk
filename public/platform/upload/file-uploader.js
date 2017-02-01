/**
 * @param configuration
 * @param {HTTPClient} authenticatedHTTPClient
 * @constructor
 */
function FileUploader(configuration, authenticatedHTTPClient) {

    this.uploadUrlEndpoint = 'https://' + configuration.domain + '/files/upload/url';
    
    this.authenticatedHTTPClient = authenticatedHTTPClient;
}

/**
 * retrieve a pre signed URL to which the file is uploaded
 * @param {string} mediaType
 * @param {function(Error, {uploadUrl: string}|null)} callback
 */
FileUploader.prototype.getUploadUrl = function (mediaType, callback) {
    this.authenticatedHTTPClient.jsonRequest('GET', this.uploadUrlEndpoint, null, { media_type: mediaType }, function (error, body) {

        if (error) {
            callback(error, null);
            return;
        }

        callback(null, { uploadUrl: body.upload_url, uploadToken: body.upload_token })
    })
};

/**
 * @type {FileUploader}
 */
module.exports = FileUploader;