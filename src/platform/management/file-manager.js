var fs = require('fs');
var _ = require('underscore');
var request = require('request');
var NS = require('../authentication/NS');
var VERB = require('../authentication/VERB');
var Token = require('../authentication/token');
var UploadUrlRequest = require('./requests/upload-url-request');
var FileDescriptor = require('./file-descriptor');
var ListFilesResponse = require('./responses/list-files-response');

/**
 * @param {Configuration} configuration
 * @param {HTTPClient} httpClient
 * @constructor
 */
function FileManager(configuration, httpClient) {

    /**
     * @type {HTTPClient}
     */
    this.httpClient = httpClient;

    /**
     * @type {string}
     */
    this.baseUrl = 'https://' + configuration.domain + '/_api/files';


    /**
     * @type {string}
     */
    this.uploadBaseUrl = 'https://' + configuration.domain + '/_api/upload';
}

/**
 * @description retrieve a signed URL to which the file is uploaded
 * @param {UploadUrlRequest?} uploadUrlRequest
 * @param {function(Error, {uploadUrl: string}|null)} callback
 */
FileManager.prototype.getUploadUrl = function (uploadUrlRequest, callback) {

    var token = new Token()
        .setSubject(NS.APPLICATION, this.configuration.appId)
        .setObject(NS.FILE, '*')
        .addVerbs(VERB.FILE_UPLOAD);

    this.httpClient.request('GET', this.uploadBaseUrl + '/url', uploadUrlRequest, token, function (error, response) {

        if (error) {
            callback(error, null);
            return;
        }

        callback(null, response)
    })
};

/**
 * @description upload a file
 * @param {string} path the destination to which the file will be uploaded
 * @param {string|Buffer|Stream} file can be one of: string - path to file, memory buffer, stream
 * @param {UploadFileRequest?} uploadRequest
 * @param {function(Error, FileDescriptor|null)} callback
 */
FileManager.prototype.uploadFile = function (path, file, uploadRequest, callback) {

    var calledBack = false;
    var stream = null;
    if (typeof file.pipe === 'function') {
        stream = file;
        stream.once('error', doCallback);
    } else if (typeof file === 'string') {
        stream = fs.createReadStream(file);
        stream.once('error', doCallback);
    } else if (file instanceof Buffer) {
        // TODO: solve missing boundary issue (content length?)
        // stream = new Stream.PassThrough();
        // stream.end(source);
        stream = file;
    } else {
        callback(new Error('unsupported source type: ' + typeof file), null);
        return;
    }

    var uploadUrlRequest = null;
    if (uploadRequest) {
        uploadUrlRequest = new UploadUrlRequest()
            .setMimeType(uploadRequest.mimeType)
            .setMediaType(uploadRequest.mediaType)
    }

    this.getUploadUrl(uploadUrlRequest, function (error, response) {

        if (error) {
            doCallback(error, null);
            return;
        }

        var form = {
            file: stream,
            path: path
        };
        if (uploadRequest) {
            _.extendOwn(form, uploadRequest);
        }

        var token = new Token()
            .setSubject(NS.APPLICATION, this.configuration.appId)
            .setObject(NS.FILE, path)
            .addVerbs(VERB.FILE_UPLOAD);

        this.httpClient.postForm(response.uploadUrl, form, token, doCallback);

    }.bind(this));

    function doCallback(error, data) {
        if (!calledBack) {
            var fileDescriptor = null;
            if (data) {
                fileDescriptor = new FileDescriptor(data);
            }
            callback(error, fileDescriptor);
            calledBack = true;
        }
    }
};

/**
 * @description creates a file descriptor, use this to create an empty directory
 * @param {FileDescriptor} fileDescriptor
 * @param {function(Error, FileDescriptor)} callback
 */
FileManager.prototype.createFile = function (fileDescriptor, callback) {

    var token = new Token()
        .setSubject(NS.APPLICATION, this.configuration.appId)
        .setObject(NS.FILE, fileDescriptor.path)
        .addVerbs(VERB.FILE_CREATE);

    this.httpClient.request('POST', this.baseUrl, fileDescriptor, token, function (error, response) {

        if (error) {
            callback(error, null);
            return;
        }

        callback(null, new FileDescriptor(response));
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
        .setSubject(NS.APPLICATION, this.configuration.appId)
        .setObject(NS.FILE, path)
        .addVerbs(VERB.FILE_GET);

    this.httpClient.request('GET', this.baseUrl, params, token, function (error, response) {

        if (error) {
            callback(error, null);
            return;
        }

        callback(null, new FileDescriptor(response));
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
        .setSubject(NS.APPLICATION, this.configuration.appId)
        .setObject(NS.FILE, path)
        .addVerbs(VERB.FILE_LIST);
    
    this.httpClient.request('GET', this.baseUrl + '/ls_dir', params, token, function (error, response) {

        if (error) {
            callback(error, null);
            return;
        }

        callback(null, new ListFilesResponse(response));
    });
};


/**
 * @type {FileManager}
 */
module.exports = FileManager;