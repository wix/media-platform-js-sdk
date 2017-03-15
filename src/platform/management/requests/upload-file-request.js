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
    this.acl = 'public';
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
 * @param {string} acl
 * @returns {UploadFileRequest}
 */
UploadFileRequest.prototype.setAcl = function (acl) {
    this.acl = acl;
    return this;
};

/**
 * @type {UploadFileRequest}
 */
module.exports = UploadFileRequest;