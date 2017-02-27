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
     * @description path to the parent directory of the file
     */
    this.directory = null;
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
 * @param {string} directory
 * @returns {UploadUrlRequest}
 */
UploadUrlRequest.prototype.setDirectory = function (directory) {
    this.directory = directory;
    return this;
};


/**
 * @type {UploadUrlRequest}
 */
module.exports = UploadUrlRequest;