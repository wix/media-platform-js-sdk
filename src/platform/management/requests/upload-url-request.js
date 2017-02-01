/**
 * @constructor
 */
function UploadUrlRequest() {

    /**
     * @type {string}
     */
    this.mimeType = null;

    /**
     * @type {string}
     */
    this.mediaType = null;
}

/**
 * @param {string} mimeType
 * @returns {UploadUrlRequest}
 */
UploadUrlRequest.prototype.setMimeType = function (mimeType) {
    this.mimeType = mimeType;
    return this;
};

/**
 * @param {string} mediaType
 * @returns {UploadUrlRequest}
 */
UploadUrlRequest.prototype.setMediaType = function (mediaType) {
    this.mediaType = mediaType;
    return this;
};

/**
 * @type {UploadUrlRequest}
 */
module.exports = UploadUrlRequest;