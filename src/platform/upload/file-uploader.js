var fs = require('fs');
var _ = require('underscore');
var request = require('request');
var MediaType = require('../../dto/media-type');
var ImageDTO = require('../../dto/image/image-dto');
var AudioDTO = require('../../dto/audio/audio-dto');
var VideoDTO = require('../../dto/video/video-dto');
var DocumentDTO = require('../../dto/document/document-dto');

/**
 * @param {Configuration} configuration
 * @param {AuthenticatedHTTPClient} authenticatedHttpClient
 * @constructor
 */
function FileUploader(configuration, authenticatedHttpClient) {

    /**
     * @type {AuthenticatedHTTPClient}
     */
    this.authenticatedHttpClient = authenticatedHttpClient;

    this.uploadUrlEndpoint = 'https://' + configuration.domain + '/files/upload/url';
}

/**
 * retrieve a pre signed URL to which the file is uploaded
 * @param {string} userId
 * @param {string} mediaType
 * @param {function(Error, {uploadUrl: string}|null)} callback
 * TODO: optional file size for preflight testing
 */
FileUploader.prototype.getUploadUrl = function (userId, mediaType, callback) {

    this.authenticatedHttpClient.jsonRequest('GET', this.uploadUrlEndpoint, userId, { media_type: mediaType }, function (error, body) {

        if (error) {
            callback(error, null);
            return;
        }

        callback(null, { uploadUrl: body.upload_url, uploadToken: body.upload_token })
    })
};

/**
 * @param {string} userId
 * @param {string|Buffer|Stream} source
 * @param {UploadRequest?} uploadRequest
 * @param {function(Error, ImageDTO)} callback
 */
FileUploader.prototype.uploadImage = function (userId, source, uploadRequest, callback) {
    this.uploadFile(userId, MediaType.IMAGE, source, uploadRequest, {}, function (error, body) {

        if (error) {
            callback(error, null);
            return;
        }

        callback(null, new ImageDTO(body[0]));
    })
};

/**
 * @param {string} userId
 * @param {string|Buffer|Stream} source
 * @param {UploadRequest?} uploadRequest
 * @param {function(Error, AudioDTO)} callback
 */
FileUploader.prototype.uploadAudio = function (userId, source, uploadRequest, callback) {

    this.uploadFile(userId, MediaType.AUDIO, source, uploadRequest, {}, function (error, body) {

        if (error) {
            callback(error, null);
            return;
        }

        callback(null, new AudioDTO(body[0]));
    })
};

/**
 * @param {string} userId
 * @param {string|Buffer|Stream} source
 * @param {EncodingOptions?} encodingOptions
 * @param {UploadRequest?} uploadRequest
 * @param {function(Error, VideoDTO)} callback
 */
FileUploader.prototype.uploadVideo = function (userId, source, encodingOptions, uploadRequest, callback) {

    var additionalParams = {};
    if (encodingOptions) {
        _.extendOwn(additionalParams, encodingOptions.toFormParams());
    }

    this.uploadFile(userId, MediaType.VIDEO, source, uploadRequest, additionalParams, function (error, body) {

        if (error) {
            callback(error, null);
            return;
        }

        callback(null, new VideoDTO(body[0]));
    })
};

/**
 * @param {string} userId
 * @param {string|Buffer|Stream} source
 * @param {UploadRequest?} uploadRequest
 * @param {function(Error, DocumentDTO)} callback
 */
FileUploader.prototype.uploadDocument = function (userId, source, uploadRequest, callback) {

    this.uploadFile(userId, MediaType.DOCUMENT, source, uploadRequest, {}, function (error, body) {

        if (error) {
            callback(error, null);
            return;
        }

        callback(null, new DocumentDTO(body[0]));
    })
};

/**
 * @param {string} userId
 * @param {string} mediaType
 * @param {string|Buffer|Stream} source
 * @param {UploadRequest} uploadRequest
 * @param {{}} additionalParams
 * @param {function(Error, *)} callback
 * @protected
 */
FileUploader.prototype.uploadFile = function (userId, mediaType, source, uploadRequest, additionalParams, callback) {

    var calledBack = false;
    var stream = null;
    if (typeof source.pipe === 'function') {
        stream = source;
        stream.on('error', doCallback);
    } else if (typeof source === 'string') {
        stream = fs.createReadStream(source);
        stream.on('error', doCallback);
    } else if (source instanceof Buffer) {
        // TODO: solve missing boundary issue (content length?)
        // stream = new Stream.PassThrough();
        // stream.end(source);
        stream = source;
    } else {
        callback(new Error('unsupported source type: ' + typeof source), null);
        return;
    }

    this.getUploadUrl(userId, mediaType, function (error, response) {

        if (error) {
            doCallback(error, null);
            return;
        }

        var form = {
            media_type: mediaType,
            upload_token: response.uploadToken
        };
        _.extendOwn(form, additionalParams);

        var fileOptions = {};
        if (uploadRequest) {
            _.extendOwn(form, uploadRequest.toFormParams());
            fileOptions = uploadRequest.toFileOptions();
        }
        if (!_.isEmpty(fileOptions)) {
            form.file = {
                value: stream,
                options: fileOptions
            }
        } else {
            form.file = stream
        }

        this.authenticatedHttpClient.anonymousFormDataRequest(response.uploadUrl, form, doCallback);
    }.bind(this));

    function doCallback(error, data) {
        if (!calledBack) {
            callback(error, data || null);
            calledBack = true;
        }
    }
};

/**
 * @type {FileUploader}
 */
module.exports = FileUploader;