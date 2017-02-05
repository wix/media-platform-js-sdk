var inherits = require('inherits');
var EventEmitter = require('eventemitter3');
var FileDescriptor = require('../../../src/platform/management/file-descriptor');
var UploadStartedEvent = require('./events/upload-started-event');
var UploadProgressEvent = require('./events/upload-progress-event');
var UploadSuccessEvent = require('./events/upload-success-event');
var UploadErrorEvent = require('./events/upload-error-event');
var UploadAbortedEvent = require('./events/upload-aborted-event');

/**
 * @param {string?} mediaType
 * @param {File?} file
 * @constructor
 * @extends {EventEmitter}
 */
function UploadJob(mediaType, file) {
    EventEmitter.call(this);

    /**
     * @type {string}
     */
    this.mediaType = mediaType;

    /**
     * @type {File}
     */
    this.file = file;

    /**
     * @type {string}
     */
    this.state = 'stopped';

    /**
     * @type {Array<string>}
     */
    this.tags = [];
}
inherits(UploadJob, EventEmitter);

/**
 * @param {string} mediaType
 * @returns {UploadJob}
 */
UploadJob.prototype.setMediaType = function (mediaType) {
    this.mediaType = mediaType;
    return this;
};

/**
 * @param {string} file
 * @returns {UploadJob}
 */
UploadJob.prototype.setFile = function (file) {
    this.file = file;
    return this;
};

/**
 * @param {string} tag
 * @returns {UploadJob}
 */
UploadJob.prototype.addTag = function (tag) {
    this.tags.push(tag);
    return this;
};

/**
 * @param {Array<string>} tags
 * @returns {UploadJob}
 */
UploadJob.prototype.setTags = function (tags) {
    this.tags = tags;
    return this;
};

/**
 * @param fileUploader
 * @returns {UploadJob}
 */
UploadJob.prototype.run = function (fileUploader) {

    if (this.state === 'running') {
        console.warn('job already running');
        return this;
    }
    this.state = 'running';

    var e = new UploadStartedEvent(this);
    this.emit(e.name, e);
    fileUploader.getUploadUrl(this.mediaType, function (error, uploadUrl) {

        if (error) {
            console.error('get upload url - error');
            var e = new UploadErrorEvent(this);
            this.emit(e.name, e);
            return;
        }

        var onProgress = function (event) {
            var e = new UploadProgressEvent(this, event.loaded, event.total);
            this.emit(e.name, e);
        }.bind(this);

        var onLoad = function (event) {
            var e;
            if (event.target.status >= 400) {
                e = new UploadErrorEvent(this);
            } else {
                e = new UploadSuccessEvent(this, FileDescriptor(event.target.payload));
            }
            this.emit(e.name, e);
        }.bind(this);

        var onError = function (event) {
            var e = new UploadErrorEvent(this);
            this.emit(e.name, e);
        }.bind(this);

        var onAbort = function (event) {
            var e = new UploadAbortedEvent(this);
            this.emit(e.name, e);
        }.bind(this);

        var onLoadEnd = function (event) {
            reset();
            this.emit('upload-end');
        }.bind(this);

        var reset = function () {
            request.removeEventListener('progress', onProgress);
            request.removeEventListener('load', onLoad);
            request.removeEventListener('error', onError);
            request.removeEventListener('abort', onAbort);
            request.removeEventListener('loadend', onLoadEnd);
            this.state = 'stopped';
        }.bind(this);

        var formData = new FormData();
        // formData.set('upload_token', uploadUrl.uploadToken);
        // formData.set('media_type', this.mediaType);
        formData.append('file', this.file);

        var request = new XMLHttpRequest();
        request.addEventListener('progress', onProgress);
        request.addEventListener('load', onLoad);
        request.addEventListener('error', onError);
        request.addEventListener('abort', onAbort);
        request.addEventListener('loadend', onLoadEnd);

        request.responseType = 'json';
        request.open('POST', uploadUrl.uploadUrl);
        request.send(formData);
    }.bind(this));

    return this;
};

/**
 * @type {UploadJob}
 */
module.exports = UploadJob;