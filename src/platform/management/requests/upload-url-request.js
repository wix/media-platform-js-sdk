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

    /**
     * @type {number|null}
     */
    this.size = null;

    /**
     * @type {string}
     */
    this.acl = 'public';
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
 * @description Optional file size in bytes. Required for file size enforcement
 * @param {number} size
 * @returns {UploadUrlRequest}
 */
UploadUrlRequest.prototype.setSize = function (size) {
    this.size = size;
    return this;
};

/**
 * @param {string} acl
 * @returns {UploadUrlRequest}
 */
UploadUrlRequest.prototype.setAcl = function (acl) {
    this.acl = acl;
    return this;
};


/**
 * @type {UploadUrlRequest}
 */
module.exports = UploadUrlRequest;