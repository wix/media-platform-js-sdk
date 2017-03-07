/**
 * @constructor
 */
function UploadFileRequest() {

    /**
     * @type {string}
     */
    this.mimeType = 'application/octet-stream';
}

/**
 * @param {string} mimeType
 * @returns {UploadFileRequest}
 */
UploadFileRequest.prototype.setMimeType = function (mimeType) {
    this.mimeType = mimeType;
    return this;
};

/**
 * @type {UploadFileRequest}
 */
module.exports = UploadFileRequest;