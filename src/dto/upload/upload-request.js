/**
 * @constructor
 */
function UploadRequest() {

    /**
     * @type {string}
     */
    this.fileName = null;

    /**
     * @type {string}
     */
    this.contentType = 'application/octet-stream';

    /**
     * @type {Array<string>}
     */
    this.tags = [];

    /**
     * @type {string|null}
     */
    this.parentFolderId = null;
}

/**
 * @param {string} fileName
 * @returns {UploadRequest}
 */
UploadRequest.prototype.setFileName = function (fileName) {
    this.fileName = fileName;
    return this;
};

/**
 * @param {string} contentType
 * @returns {UploadRequest}
 */
UploadRequest.prototype.setContentType = function (contentType) {
    this.contentType = contentType;
    return this;
};

/**
 * @param {Array<string>} tags
 * @returns {UploadRequest}
 */
UploadRequest.prototype.setTags = function (tags) {
    this.tags = tags;
    return this;
};

/**
 * @param {...string|Array<string>} tag
 * @returns {UploadRequest}
 */
UploadRequest.prototype.addTags = function (tag) {
    this.tags = this.tags.concat(Array.from(arguments));
    return this;
};

/**
 * @param {string} parentFolderId
 * @returns {UploadRequest}
 */
UploadRequest.prototype.setParentFolderId = function (parentFolderId) {
    this.parentFolderId = parentFolderId;
    return this;
};

/**
 * @returns {{}}
 */
UploadRequest.prototype.toFormParams = function () {
    
    var params = {};
    
    if (this.tags.length > 0) {
        params.tags = this.tags.join();
    }
    
    if (this.parentFolderId) {
        params.parent_folder_id = this.parentFolderId
    }
    
    return params;
};

/**
 * @returns {{}}
 */
UploadRequest.prototype.toFileOptions = function () {

    var options = {};
    
    if (this.fileName) {
        options.filename = this.fileName;
    }
    
    if (this.contentType) {
        options.contentType = this.contentType;
    }
    
    return options;
};

/**
 * @type {UploadRequest}
 */
module.exports = UploadRequest;