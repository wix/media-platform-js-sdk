var inherits = require('inherits');
var UploadEvent = require('./upload-event');

/**
 * @param {UploadJob} target
 * @param {object} response
 * @param {Array<FileDescriptor>} fileDescriptors
 * @constructor
 */
function UploadSuccessEvent(target, response, fileDescriptors) {
    UploadEvent.call(this, target, response);

    /**
     * @type {string}
     */
    this.name = 'upload-success';

    /**
     * @type {Array<FileDescriptor>}
     */
    this.fileDescriptors = fileDescriptors;
}
inherits(UploadSuccessEvent, UploadEvent);

/**
 * @type {UploadSuccessEvent}
 */
module.exports = UploadSuccessEvent;