var _ = require('underscore');
var NS = require('../authentication/NS');
var VERB = require('../authentication/VERB');
var Token = require('../authentication/token');
var FileDescriptor = require('./file-descriptor');
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
    this.apiUrl = 'https://' + configuration.domain + '/_api/files';

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
 * @param {string} path
 * @param {ListFilesRequest?} listFilesRequest
 * @param {function(Error, ListFilesResponse)} callback
 */
FileManager.prototype.listFiles = function (path, listFilesRequest, callback) {
    
    var params = {
        path: path
    };
    _.extendOwn(params, listFilesRequest);

    var token = new Token()
        .setIssuer(NS.APPLICATION, this.configuration.appId)
        .setSubject(NS.APPLICATION, this.configuration.appId)
        .setObject(NS.FILE, path)
        .addVerbs(VERB.FILE_LIST);
    
    this.httpClient.request('GET', this.apiUrl + '/ls_dir', params, token, function (error, response) {

        if (error) {
            callback(error, null);
            return;
        }

        callback(null, new ListFilesResponse(response.payload));
    });
};


/**
 * @type {FileManager}
 */
module.exports = FileManager;