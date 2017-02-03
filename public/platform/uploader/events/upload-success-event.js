var inherits = require('inherits');
var UploadEvent = require('./upload-event');

/**
 * @param {UploadJob} target
 * @param {FileDescriptor} fileDescriptor
 * @constructor
 */
function UploadSuccessEvent(target, fileDescriptor) {
    UploadEvent.call(this, target);

    /**
     * @type {string}
     */
    this.name = 'upload-success';

    /**
     * @type {FileDescriptor}
     */
    this.fileDescriptor = fileDescriptor;
}
inherits(UploadSuccessEvent, UploadEvent);

/**
 * @type {UploadSuccessEvent}
 */
module.exports = UploadSuccessEvent;