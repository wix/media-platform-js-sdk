var fs = require('fs');
var Stream = require('stream');
var _ = require('underscore');
var request = require('request');
// require('request-debug')(request);
var MediaType = require('./media-type');
var ImageDTO = require('../../dto/image/image-dto');
var AudioDTO = require('../../dto/audio/audio-dto');
var VideoDTO = require('../../dto/video/video-dto');
var DocumentDTO = require('../../dto/document/document-dto');

/**
 * @param {ProviderConfiguration} configuration
 * @param {AuthenticationFacade} authenticationFacade
 * @constructor
 */
function FileUploader(configuration, authenticationFacade) {

    this.authenticationFacade = authenticationFacade;

    this.configuration = configuration;

    this.uploadUrlEndpoint = 'https://' + this.configuration.domain + '/files/upload/url';

}

/**
 * retrieve a pre signed URL to which the file is uploaded
 * @param {string} userId
 * @param {string} mediaType
 * @param {function(Error, {uploadUrl: string}|null)} callback
 */
FileUploader.prototype.getUploadUrl = function (userId, mediaType, callback) {

    this.authenticationFacade.getHeader(userId, function(error, authHeader) {

        if (error) {
            callback(error, null);
            return;
        }

        request.get({url: this.uploadUrlEndpoint, qs: {media_type: mediaType}, headers: authHeader, json: true }, function (error, response, body) {

            if (error) {
                callback(error, null);
                return;
            }

            if (response.statusCode !== 200) {
                callback(new Error(response.body), null);
                return;
            }

            callback(null, { uploadUrl: body.upload_url, uploadToken: body.upload_token })
        })
    }.bind(this))
};

/**
 * @param {string} userId
 * @param {string|Buffer|Stream} source
 * @param {function(Error, ImageDTO)} callback
 */
FileUploader.prototype.uploadImage = function (userId, source, callback) {

    this.uploadFile(userId, MediaType.IMAGE, source, {}, function (error, body) {

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
 * @param {function(Error, AudioDTO)} callback
 */
FileUploader.prototype.uploadAudio = function (userId, source, callback) {

    this.uploadFile(userId, MediaType.AUDIO, source, {}, function (error, body) {

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
 * @param {function(Error, VideoDTO)} callback
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

        callback(null, new VideoDTO(body[0]));
    })
};

/**
 * @param {string} userId
 * @param {string|Buffer|Stream} source
 * @param {function(Error, DocumentDTO)} callback
 */
FileUploader.prototype.uploadDocument = function (userId, source, callback) {

    this.uploadFile(userId, MediaType.DOCUMENT, source, {}, function (error, body) {

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
 * @param {Object} params
 * @param {function(Error, *)} callback
 * @protected
 */
FileUploader.prototype.uploadFile = function (userId, mediaType, source, params, callback) {

    var calledBack = false;
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
    stream.on('error', doCallback);

    this.getUploadUrl(userId, mediaType, function (error, response) {

        if (error) {
            doCallback(error, null);
            return;
        }

        var form = {
            media_type: mediaType,
            upload_token: response.uploadToken,
            file: stream
        };

        _.extendOwn(form, params);

        request.post({url: response.uploadUrl, formData: form, json: true }, function (error, response, body) {

            if (error) {
                doCallback(error, null);
                return;
            }

            if (response.statusCode !== 200) {
                doCallback(new Error(JSON.stringify(body)), null);
                return;
            }

            doCallback(null, body);
        });
    });

    function doCallback(error, data) {
        if (!calledBack) {
            callback(error, data);
        }
        calledBack = true;
    }
};

/**
 * @type {FileUploader}
 */
module.exports = FileUploader;