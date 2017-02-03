var inherits = require('inherits');
var UploadEvent = require('./upload-event');

/**
 * @param {UploadJob} target
 * @constructor
 */
function UploadAbortedEvent(target) {
    UploadEvent.call(this, target);

    /**
     * @type {string}
     */
    this.name = 'upload-aborted';
}
inherits(UploadAbortedEvent, UploadEvent);

/**
 * @type {UploadAbortedEvent}
 */
module.exports = UploadAbortedEvent;