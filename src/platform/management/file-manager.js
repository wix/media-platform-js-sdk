var _ = require('underscore');
var FileDescriptor = require('./metadata/file-descriptor');
var FileMetadata = require('./metadata/file-metadata');
var ListFilesResponse = require('./responses/list-files-response');

/**
 * @param {Configuration} configuration
 * @param {HTTPClient} httpClient
 * @param {FileUploader} fileUploader
 * @constructor
 */
function FileManager(configuration, httpClient, fileUploader) {

    /**
     * @type {Configuration}
     */
    this.configuration = configuration;

    /**
     * @type {HTTPClient}
     */
    this.httpClient = httpClient;

    /**
     * @type {string}
     */
    this.baseUrl = 'https://' + configuration.domain;

    /**
     * @type {string}
     */
    this.apiUrl = this.baseUrl + '/_api/files';

    /**
     * @type {FileUploader}
     */
    this.fileUploader = fileUploader;
}

/**
 * @param {UploadUrlRequest?} uploadUrlRequest
 * @param {function(Error, UploadUrlResponse)} callback
 */
FileManager.prototype.getUploadUrl = function (uploadUrlRequest, callback) {
    this.fileUploader.getUploadUrl(uploadUrlRequest, callback);
};

/**
 * @description upload a file
 * @param {string} path the destination to which the file will be uploaded
 * @param {string|Buffer|Stream} file can be one of: string - path to file, memory buffer, stream
 * @param {UploadFileRequest?} uploadRequest
 * @param {function(Error, FileDescriptor|null)} callback
 */
FileManager.prototype.uploadFile = function (path, file, uploadRequest, callback) {
    return this.fileUploader.uploadFile(path, file, uploadRequest, callback);
};

/**
 * @description creates a file descriptor, use this to create an empty directory
 * @param {FileDescriptor} fileDescriptor
 * @param {function(Error, FileDescriptor)} callback
 */
FileManager.prototype.createFile = function (fileDescriptor, callback) {
    this.httpClient.request('POST', this.apiUrl, fileDescriptor, null, function (error, response) {

        if (error) {
            callback(error, null);
            return;
        }

        callback(null, new FileDescriptor(response.payload));
    });
};

/**
 * @param {string} path
 * @param {function(Error, FileDescriptor)} callback
 */
FileManager.prototype.getFile = function (path, callback) {

    var params = {
        path: path
    };

    this.httpClient.request('GET', this.apiUrl, params, null, function (error, response) {

        if (error) {
            callback(error, null);
            return;
        }

        callback(null, new FileDescriptor(response.payload));
    });
};

/**
 * @param {string} fileId
 * @param {function(Error, FileMetadata)} callback
 */
FileManager.prototype.getFileMetadataById = function (fileId, callback) {

    this.httpClient.request('GET', this.apiUrl + '/' + fileId + '/metadata', {}, null, function (error, response) {

        if (error) {
            callback(error, null);
            return;
        }

        callback(null, new FileMetadata(response.payload));
    });
};

/**
 * @param {string} path
 * @param {ListFilesRequest?} listFilesRequest
 * @param {function(Error, ListFilesResponse)} callback
 */
FileManager.prototype.listFiles = function (path, listFilesRequest, callback) {
    
    var params = {
        path: path
    };
    _.extendOwn(params, listFilesRequest);

    this.httpClient.request('GET', this.apiUrl + '/ls_dir', params, null, function (error, response) {

        if (error) {
            callback(error, null);
            return;
        }

        callback(null, new ListFilesResponse(response.payload));
    });
};

/**
 * @param {string} path
 * @param {function(Error)} callback
 */
FileManager.prototype.deleteFileByPath = function (path, callback) {

    var params = {
        path: path
    };

    this.httpClient.request('DELETE', this.apiUrl, params, null, function (error, response) {

        if (error) {
            callback(error);
            return;
        }

        callback(null);
    });
};

/**
 * @param {string} id
 * @param {function(Error)} callback
 */
FileManager.prototype.deleteFileById = function (id, callback) {

    this.httpClient.request('DELETE', this.apiUrl + '/' + id, null, null, function (error, response) {

        if (error) {
            callback(error);
            return;
        }

        callback(null);
    });
};


/**
 * @type {FileManager}
 */
module.exports = FileManager;