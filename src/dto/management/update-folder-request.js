/**
 * @constructor
 */
function UpdateFolderRequest() {

    /**
     * @type {string}
     */
    this.folderName = null;
}

/**
 * @param {string} folderName
 * @returns {UpdateFolderRequest}
 */
UpdateFolderRequest.prototype.setFolderName = function (folderName) {
    this.folderName = folderName;
    return this;
};

/**
 * @returns {{folder_name: (string)}}
 */
UpdateFolderRequest.prototype.toParams = function () {
    return {
        folder_name: this.folderName
    }
};

/**
 * @type {UpdateFolderRequest}
 */
module.exports = UpdateFolderRequest;

/*
 {
    "folder_name": "string value"
 }
 */
