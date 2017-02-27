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
    this.path = null;
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
 * @param {string} path
 * @returns {UploadUrlRequest}
 */
UploadUrlRequest.prototype.setPath = function (path) {
    this.path = path;
    return this;
};


/**
 * @type {UploadUrlRequest}
 */
module.exports = UploadUrlRequest;