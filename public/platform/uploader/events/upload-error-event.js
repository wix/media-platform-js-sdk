var inherits = require('inherits');
var UploadEvent = require('./upload-event');

/**
 * @param {UploadJob} target
 * @constructor
 */
function UploadErrorEvent(target) {
    UploadEvent.call(this, target);

    /**
     * @type {string}
     */
    this.name = 'upload-error';
}
inherits(UploadErrorEvent, UploadEvent);

/**
 * @type {UploadErrorEvent}
 */
module.exports = UploadErrorEvent;