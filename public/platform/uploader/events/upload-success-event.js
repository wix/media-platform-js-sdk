var inherits = require('inherits');
var UploadEvent = require('./upload-event');

/**
 * @param {UploadJob} target
 * @param {Array<FileDescriptor>} fileDescriptors
 * @constructor
 */
function UploadSuccessEvent(target, fileDescriptors) {
    UploadEvent.call(this, target);

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