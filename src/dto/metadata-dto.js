/**
 * @constructor
 */
function MetadataDTO() {

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
 * @param {Array<string>} tags
 * @returns {MetadataDTO}
 */
MetadataDTO.prototype.setTags = function (tags) {
    this.tags = tags;
    return this;
};

/**
 * @param {...string|Array<string>} tag
 * @returns {MetadataDTO}
 */
MetadataDTO.prototype.addTags = function (tag) {
    this.tags = this.tags.concat(Array.from(arguments));
    return this;
};

/**
 * @param {string} parentFolderId
 * @returns {MetadataDTO}
 */
MetadataDTO.prototype.setParentFolderId = function (parentFolderId) {
    this.parentFolderId = parentFolderId;
    return this;
};

/**
 * @returns {{}}
 */
MetadataDTO.prototype.toFormParams = function () {
    
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
 * @type {MetadataDTO}
 */
module.exports = MetadataDTO;