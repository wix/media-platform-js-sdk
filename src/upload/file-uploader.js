var fs = require('fs');
var Stream = require('stream');
var _ = require('underscore');
var request = require('request');
var MediaType = require('./media-type');
var ImageUploadResponse = require('./dto/image/image-upload-response');
var AudioUploadResponse = require('./dto/audio/audio-upload-response');
var VideoUploadResponse = require('./dto/video/video-upload-response');
var DocumentUploadResponse = require('./dto/document/document-upload-response');

/**
 * @param {ProviderConfiguration} configuration
 * @param {AuthenticationFacade} authenticationFacade
 * @constructor
 */
function FileUploader(configuration, authenticationFacade) {

    this.authenticationFacade = authenticationFacade;

    this.configuration = configuration;

    this.uploadUrlEndpoint = 'https://upload.' + this.configuration.domain + '/files/upload/url';

}

/**
 * retrieve a pre signed URL to which the file is uploaded
 * @param {string} userId
 * @param {function(Error, {uploadUrl: string}|null)} callback
 */
FileUploader.prototype.getUploadUrl = function (userId, callback) {

    this.authenticationFacade.getHeader(userId, function(error, authHeader) {

        if (error) {
            callback(error, null);
            return;
        }

        request.get({url: this.uploadUrlEndpoint, headers: authHeader, json: true }, function (error, response, body) {

            if (error) {
                callback(error, null);
                return;
            }

            //TODO: does this require the token as well?
            callback(null, { uploadUrl: body.upload_url })
        })
    }.bind(this))
};

/**
 * @param {string} userId
 * @param {string|Buffer|Stream} source
 * @param {function(Error, ImageUploadResponse)} callback
 */
FileUploader.prototype.uploadImage = function (userId, source, callback) {

    this.uploadFile(userId, MediaType.IMAGE, source, {}, function (error, body) {

        if (error) {
            callback(error, null);
            return;
        }

        callback(null, new ImageUploadResponse(body[0]));
    })
};

/**
 * @param {string} userId
 * @param {string|Buffer|Stream} source
 * @param {function(Error, AudioUploadResponse)} callback
 */
FileUploader.prototype.uploadAudio = function (userId, source, callback) {

    this.uploadFile(userId, MediaType.AUDIO, source, {}, function (error, body) {

        if (error) {
            callback(error, null);
            return;
        }

        callback(null, new AudioUploadResponse(body[0]));
    })
};

/**
 * @param {string} userId
 * @param {string|Buffer|Stream} source
 * @param {EncodingOptions?} encodingOptions
 * @param {function(Error, VideoUploadResponse)} callback
 */
FileUploader.prototype.uploadVideo = function (userId, source, encodingOptions, callback) {

    var params = {};
    if (encodingOptions) {
        params = {encoding_options: JSON.stringify(encodingOptions)}
    }

    this.uploadFile(userId, MediaType.VIDEO, source, params, function (error, body) {

        if (error) {
            callback(error, null);
            return;
        }

        callback(null, new VideoUploadResponse(body[0]));
    })
};

/**
 * @param {string} userId
 * @param {string|Buffer|Stream} source
 * @param {function(Error, DocumentUploadResponse)} callback
 */
FileUploader.prototype.uploadDocument = function (userId, source, callback) {

    this.uploadFile(userId, MediaType.DOCUMENT, source, {}, function (error, body) {

        if (error) {
            callback(error, null);
            return;
        }

        callback(null, new DocumentUploadResponse(body[0]));
    })
};

/**
 * @param {string} userId
 * @param {string} type
 * @param {string|Buffer|Stream} source
 * @param {Object} params
 * @param {function(Error, *)} callback
 * @protected
 */
FileUploader.prototype.uploadFile = function (userId, type, source, params, callback) {

    var stream = null;
    if (typeof source.pipe === 'function') {
        stream = source;
    } else if (typeof source === 'string') {
        stream = fs.createReadStream(source);
    } else if (source instanceof Buffer) {
        stream = new Stream.PassThrough();
        stream.end(source);
    } else {
        callback(new Error('unsupported source type: ' + typeof source), null);
        return;
    }
    stream.on('error', callback);

    this.getUploadUrl(userId, function (error, response) {

        if (error) {
            callback(error, null);
            return;
        }

        var form = {
            media_type: type,
            file: stream
        };

        _.extendOwn(form, params);

        request.post({url: response.uploadUrl, formData: form, json: true }, function(error, response, body) {

            if (error) {
                callback(error, null);
                return;
            }

            callback(null, body);
        });
    });
};

/**
 * @type {FileUploader}
 */
module.exports = FileUploader;