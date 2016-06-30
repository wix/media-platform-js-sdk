/**
 * @constructor
 */
function UpdateFileRequest() {

    /**
     * @type {string|null}
     */
    this.originalFileName = null;

    /**
     * @type {string|null}
     */
    this.parentFolderId = null;

    /**
     * @type {Array<string>}
     */
    this.tags = [];
}

/**
 * @param {string} originalFileName
 * @returns {UpdateFileRequest}
 */
UpdateFileRequest.prototype.setOriginalFileName = function (originalFileName) {
    this.originalFileName = originalFileName;
    return this;
};

/**
 * @param {string} parentFolderId
 * @returns {UpdateFileRequest}
 */
UpdateFileRequest.prototype.setParentFolderId = function (parentFolderId) {
    this.parentFolderId = parentFolderId;
    return this;
};

/**
 * @param {Array<string>} tags
 * @returns {UpdateFileRequest}
 */
UpdateFileRequest.prototype.setTags = function (tags) {
    this.tags = tags;
    return this;
};

UpdateFileRequest.prototype.toParams = function () {
    return {
        original_file_name: this.originalFileName,
        parent_folder_id: this.parentFolderId,
        tags: this.tags
    }
};

/**
 * @type {UpdateFileRequest}
 */
module.exports = UpdateFileRequest;
/*
{
    "original_file_name": "string value",
    "parent_folder_id": "string value",
    "tags": ['fish']
}
*/