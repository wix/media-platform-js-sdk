var fs = require('fs');
var _ = require('underscore');
var UploadUrlRequest = require('./requests/upload-url-request');
var UploadUrlResponse = require('./responses/upload-url-response');
var FileDescriptor = require('./metadata/file-descriptor');

/**
 * @param {Configuration} configuration
 * @param {HTTPClient} httpClient
 * @constructor
 */
function FileUploader(configuration, httpClient) {

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
    this.apiUrl = 'https://' + configuration.domain + '/_api/upload';
}

/**
 * @description retrieve a signed URL to which the file is uploaded
 * @param {UploadUrlRequest?} uploadUrlRequest
 * @param {function(Error, UploadUrlResponse)} callback
 */
FileUploader.prototype.getUploadUrl = function (uploadUrlRequest, callback) {

    this.httpClient.request('GET', this.apiUrl + '/url', uploadUrlRequest, null, function (error, response) {

        if (error) {
            callback(error, null);
            return;
        }

        callback(null, new UploadUrlResponse(response.payload))
    })
};

/**
 * @description upload a file
 * @param {string} path the destination to which the file will be uploaded
 * @param {string|Buffer|Stream} file can be one of: string - path to file, memory buffer, stream
 * @param {UploadFileRequest?} uploadRequest
 * @param {function(Error, Array<FileDescriptor>|null)} callback
 */
FileUploader.prototype.uploadFile = function (path, file, uploadRequest, callback) {

    var calledBack = false;
    var stream = null;
    var size = null;

    if (typeof file.pipe === 'function') {
        stream = file;
        stream.once('error', doCallback);
    } else if (typeof file === 'string') {
        try {
            size = fs.statSync(file).size;
        } catch (error) {
            doCallback(error, null);
        }
        stream = fs.createReadStream(file);
        stream.once('error', doCallback);
    } else if (file instanceof Buffer) {
        // noinspection JSUnresolvedVariable
        size = file.byteLength;
        stream = {
            value: file,
            options: {
                filename: 'filename'
            }
        };
    } else {
        doCallback(new Error('unsupported source type: ' + typeof file), null);
        return;
    }

    var uploadUrlRequest = null;
    if (uploadRequest) {
        uploadUrlRequest = new UploadUrlRequest()
            .setMimeType(uploadRequest.mimeType)
            .setPath(path)
            .setAcl(uploadRequest.acl);
        if (size) {
            uploadUrlRequest.setSize(size);
        }
    }

    this.getUploadUrl(uploadUrlRequest, function (error, response) {

        if (error) {
            doCallback(error, null);
            return;
        }

        var form = {
            file: stream,
            path: path,
            uploadToken: response.uploadToken
        };
        if (uploadRequest) {
            _.extendOwn(form, uploadRequest);
        }

        this.httpClient.postForm(response.uploadUrl, form, null, doCallback);

    }.bind(this));

    function doCallback(error, response) {
        if (!calledBack) {
            var fileDescriptors = null;
            if (response) {
                fileDescriptors = response.payload.map(function (file) {
                    return new FileDescriptor(file);
                });
            }
            callback(error, fileDescriptors);
            calledBack = true;
        }
    }
};

/**
 * @type {FileUploader}
 */
module.exports = FileUploader;