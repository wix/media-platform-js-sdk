var fs = require('fs');
var Stream = require('stream');
var needle = require('needle');
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
 * @param {function(Error, string|null)} callback
 */
FileUploader.prototype.getUploadUrl = function (userId, callback) {

    this.authenticationFacade.getHeader(userId, function(error, authHeader) {

        if (error) {
            callback(error, null);
            return;
        }

        request({url: this.uploadUrlEndpoint, headers: authHeader, json: true }, function (error, response, body) {

            if (error) {
                callback(error, null);
                return;
            }
            
            callback(null, body.upload_url)
        })
    }.bind(this))
};

/**
 * @param source
 * @param callback
 */
FileUploader.prototype.uploadImage = function (source, callback) {

    this.uploadFile(userId, MediaType.IMAGE, source, function (error, body) {

        if (error) {
            callback(error, null);
            return;
        }

        callback(null, new ImageUploadResponse(body[0]));
    })
};

FileUploader.prototype.uploadAudio = function (source, callback) {

    this.uploadFile(userId, MediaType.AUDIO, source, function (error, body) {

        if (error) {
            callback(error, null);
            return;
        }

        callback(null, new AudioUploadResponse(body[0]));
    })
};

FileUploader.prototype.uploadVideo = function (source, callback) {

    this.uploadFile(userId, MediaType.VIDEO, source, function (error, body) {

        if (error) {
            callback(error, null);
            return;
        }

        callback(null, new VideoUploadResponse(body[0]));
    })
};

FileUploader.prototype.uploadDocument = function (source, callback) {

    this.uploadFile(userId, MediaType.DOCUMENT, source, function (error, body) {

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
 * @param {function(Error, data)} callback
 * @private
 */
FileUploader.prototype.uploadFile = function (userId, type, source, callback) {

    var stream = null;
    if (typeof source.pipe === 'function') {
        stream = source;
    } else if (typeof source === 'string') {
        stream = fs.createReadStream(source);
    } else if (source instanceof Buffer) {
        stream = new Stream.PassThrough().end(source);
    } else {
        callback(new Error('unsupported source type: ' + typeof source), null);
    }

    this.getUploadUrl(userId, function (error, url) {

        if (error) {
            callback(error, null);
            return;
        }

        var form = {
            media_type: type,
            file: stream
        };

        request.post({url: url, formData: form, json: true }, function(error, response, body) {

            if (error) {
                callback(error, null);
                return;
            }

            callback(null, body);
        });
    });
};

module.exports = FileUploader;