var inherits = require('inherits');
var UploadEvent = require('./upload-event');

/**
 * @param {UploadJob} target
 * @param {Response} response
 * @constructor
 */
function UploadErrorEvent(target, response) {
    UploadEvent.call(this, target, response);

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