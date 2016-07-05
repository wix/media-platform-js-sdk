/**
 * @constructor
 */
function NewFolderRequest() {

    /**
     * @type {string}
     */
    this.mediaType = null;

    /**
     * @type {string}
     */
    this.folderName = null;

    /**
     * @type {string}
     */
    this.parentFolderId = null;
}

/**
 * @param {string} mediaType
 * @returns {NewFolderRequest}
 */
NewFolderRequest.prototype.setMediaType = function (mediaType) {
    this.mediaType = mediaType;
    return this;
};

/**
 * @param {string} folderName
 * @returns {NewFolderRequest}
 */
NewFolderRequest.prototype.setFolderName = function (folderName) {
    this.folderName = folderName;
    return this;
};

/**
 * @param {string} parentFolderId
 * @returns {NewFolderRequest}
 */
NewFolderRequest.prototype.setParentFolderId = function (parentFolderId) {
    this.parentFolderId = parentFolderId;
    return this;
};

/**
 * @returns {{media_type: (string|*), folder_name: (string|*), parent_folder_id: (string|*)}}
 */
NewFolderRequest.prototype.toParams = function () {
    return {
        media_type: this.mediaType,
        folder_name: this.folderName,
        parent_folder_id: this.parentFolderId
    }
};

/**
 * @type {NewFolderRequest}
 */
module.exports = NewFolderRequest;

/*
 {
 "folder_name": "string value",
 "parent_folder_id": "string value"
 } 
 */
