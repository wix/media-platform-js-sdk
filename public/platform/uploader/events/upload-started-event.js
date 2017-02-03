var inherits = require('inherits');
var UploadEvent = require('./upload-event');

function UploadStartedEvent(target) {
    UploadEvent.call(this, target);

    /**
     * @type {string}
     */
    this.name = 'upload-started';
}
inherits(UploadStartedEvent, UploadEvent);

/***
 * @type {UploadStartedEvent}
 */
module.exports = UploadStartedEvent;