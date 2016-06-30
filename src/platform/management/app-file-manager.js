/**
 * @param {AppConfiguration} configuration
 * @param {FileManager} fileManager
 * @constructor
 */
function AppFileManager(configuration, fileManager) {

    /**
     * @type {FileManager}
     */
    this.fileManager = fileManager;

    /**
     * @type {string}
     */
    this.userId = configuration.apiKey;
}

/**
 * @param {ListFilesRequest} listFilesRequest
 * @param {function(Error, ListFilesResponse)} callback
 */
AppFileManager.prototype.listFiles = function (listFilesRequest, callback) {
    this.fileManager.listFiles(this.userId, listFilesRequest, callback);
};

/**
 * @param {string} fileId
 * @param {function(Error, BaseDTO)} callback
 */
AppFileManager.prototype.getFile = function (fileId, callback) {
    this.fileManager.getFile(this.userId, fileId, callback);
};

/**
 * @param {string} fileId
 * @param {UpdateFileRequest} updateFileRequest
 * @param {function(Error, BaseDTO)} callback
 */
AppFileManager.prototype.updateFile = function (fileId, updateFileRequest, callback) {
    this.fileManager.updateFile(this.userId, fileId, updateFileRequest, callback);
};

/**
 * @param {string} fileId
 * @param {function(Error)} callback
 */
AppFileManager.prototype.deleteFile = function (fileId, callback) {
    this.fileManager.deleteFile(this.userId, fileId, callback);
};

/**
 * @param {string?} parentFolderId
 * @param {function(Error, ListFoldersResponse)} callback
 */
AppFileManager.prototype.listFolders = function (parentFolderId, callback) {
    this.fileManager.listFolders(this.userId, parentFolderId, callback);
};

/**
 * @param {NewFolderRequest} newFolderRequest
 * @param {function(Error, FolderDTO)} callback
 */
AppFileManager.prototype.newFolder = function (newFolderRequest, callback) {
    this.fileManager.newFolder(this.userId, newFolderRequest, callback);
};

/**
 * @param {string} folderId
 * @param {UpdateFolderRequest} updateFolderRequest
 * @param {function(Error, FolderDTO)} callback
 */
AppFileManager.prototype.updateFolder = function (folderId, updateFolderRequest, callback) {
    this.fileManager.updateFolder(this.userId, folderId, updateFolderRequest, callback);
};

/**
 * @param {string} folderId
 * @param {function(Error)} callback
 */
AppFileManager.prototype.deleteFolder = function (folderId, callback) {
    this.fileManager.deleteFolder(this.userId, folderId, callback);
};

/**
 * @type {AppFileManager}
 */
module.exports = AppFileManager;