var _ = require('underscore');
var NS = require('../authentication/NS');
var VERB = require('../authentication/VERB');
var Token = require('../authentication/token');
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
 * @param {UploadUrlRequest} uploadUrlRequest
 * @param {function(Error, FileDescriptor)} callback
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
    this.fileUploader.uploadFile(path, file, uploadRequest, callback);
};

/**
 * @description creates a file descriptor, use this to create an empty directory
 * @param {FileDescriptor} fileDescriptor
 * @param {function(Error, FileDescriptor)} callback
 */
FileManager.prototype.createFile = function (fileDescriptor, callback) {

    var token = new Token()
        .setIssuer(NS.APPLICATION, this.configuration.appId)
        .setSubject(NS.APPLICATION, this.configuration.appId)
        .setObject(NS.FILE, fileDescriptor.path)
        .addVerbs(VERB.FILE_CREATE);

    this.httpClient.request('POST', this.apiUrl, fileDescriptor, token, function (error, response) {

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

    var token = new Token()
        .setIssuer(NS.APPLICATION, this.configuration.appId)
        .setSubject(NS.APPLICATION, this.configuration.appId)
        .setObject(NS.FILE, path)
        .addVerbs(VERB.FILE_GET);

    this.httpClient.request('GET', this.apiUrl, params, token, function (error, response) {

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

    var token = new Token()
        .setIssuer(NS.APPLICATION, this.configuration.appId)
        .setSubject(NS.APPLICATION, this.configuration.appId)
        .setObject(NS.FILE, fileId)
        .addVerbs(VERB.FILE_GET);

    this.httpClient.request('GET', this.apiUrl + '/' + fileId + '/metadata', {}, token, function (error, response) {

        if (error) {
            callback(error, null);
            return;
        }

        callback(null, new FileMetadata(response.payload));
    });
};

/**
 * @param {Object} params
 * @param {function(Error, string | null)} callback
 */
FileManager.prototype.getDownloadUrl = function (params, callback) {

    var token = new Token()
        .setIssuer(NS.APPLICATION, this.configuration.appId)
        .setSubject(NS.APPLICATION, this.configuration.appId)
        .setObject(NS.FILE, params.path)
        .addVerbs(VERB.FILE_DOWNLOAD);

    this.httpClient.request('GET', this.baseUrl + '/_api/download/secure_url', params, token, function (error, response) {

        if (error) {
            callback(error, null);
            return;
        }

        callback(null, this.baseUrl + response.payload.downloadUrl);
    }.bind(this));
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

    // var token = new Token()
    //     .setIssuer(NS.APPLICATION, this.configuration.appId)
    //     .setSubject(NS.APPLICATION, this.configuration.appId)
    //     .setObject(NS.FILE, path)
    //     .addVerbs(VERB.FILE_LIST);
    
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

    var token = new Token()
        .setIssuer(NS.APPLICATION, this.configuration.appId)
        .setSubject(NS.APPLICATION, this.configuration.appId)
        .setObject(NS.FILE, path)
        .addVerbs(VERB.FILE_DELETE);

    this.httpClient.request('DELETE', this.apiUrl, params, token, function (error, response) {

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

    var token = new Token()
        .setIssuer(NS.APPLICATION, this.configuration.appId)
        .setSubject(NS.APPLICATION, this.configuration.appId)
        .setObject(NS.FILE, id)
        .addVerbs(VERB.FILE_DELETE);

    this.httpClient.request('DELETE', this.apiUrl + '/' + id, null, token, function (error, response) {

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