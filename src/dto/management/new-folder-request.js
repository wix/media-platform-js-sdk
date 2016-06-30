/**
 * @constructor
 */
function NewFolderRequest() {

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
 * @returns {{folder_name: string, parent_folder_id: string}}
 */
NewFolderRequest.prototype.toParams = function () {
    return {
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
