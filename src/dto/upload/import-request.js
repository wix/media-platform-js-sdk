/**
 * @constructor
 */
function ImportRequest() {

    /**
     * @type {string}
     */
    this.url = null;

    /**
     * @type {string}
     */
    this.mediaType = null;

    /**
     * @type {string}
     */
    this.fileName = null;

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
 * @param {string} url
 * @returns {ImportRequest}
 */
ImportRequest.prototype.setUrl = function (url) {
    this.url = url;
    return this;
};

/**
 * @param {string} mediaType
 * @returns {ImportRequest}
 */
ImportRequest.prototype.setMediaType = function (mediaType) {
    this.mediaType = mediaType;
    return this;
};

/**
 * @param {string} fileName
 * @returns {ImportRequest}
 */
ImportRequest.prototype.setFileName = function (fileName) {
    this.fileName = fileName;
    return this;
};

/**
 * @param {Array<string>} tags
 * @returns {ImportRequest}
 */
ImportRequest.prototype.setTags = function (tags) {
    this.tags = tags;
    return this;
};

/**
 * @param {...string|Array<string>} tag
 * @returns {ImportRequest}
 */
ImportRequest.prototype.addTags = function (tag) {
    this.tags = this.tags.concat(Array.from(arguments));
    return this;
};

/**
 * @param {string} parentFolderId
 * @returns {ImportRequest}
 */
ImportRequest.prototype.setParentFolderId = function (parentFolderId) {
    this.parentFolderId = parentFolderId;
    return this;
};

/**
 * @returns {{}}
 */
ImportRequest.prototype.toParams = function () {
    return {
        url: this.url,
        media_type: this.mediaType,
        name: this.fileName,
        tags: this.tags,
        parent_folder_id: this.parentFolderId
    };
};


/**
 * @type {ImportRequest}
 */
module.exports = ImportRequest;