/**
 * @constructor
 */
function UploadFileRequest() {

    /**
     * @type {string}
     */
    this.mimeType = 'application/octet-stream';

    /**
     * @type {string}
     */
    this.mediaType = null;

    /**
     * @type {Array<string>}
     */
    this.tags = [];
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
 * @param {string} mediaType
 * @returns {UploadFileRequest}
 */
UploadFileRequest.prototype.setMediaType = function (mediaType) {
    this.mediaType = mediaType;
    return this;
};

/**
 * @param {...string|Array<string>} tags
 * @returns {UploadFileRequest}
 */
UploadFileRequest.prototype.addTags = function (tags) {
    this.tags = this.tags.concat(Array.from(arguments));
    return this;
};

/**
 * @param {Array<string>} tags
 * @returns {UploadFileRequest}
 */
UploadFileRequest.prototype.setTags = function (tags) {
    this.tags = tags;
    return this;
};

/**
 * @type {UploadFileRequest}
 */
module.exports = UploadFileRequest;