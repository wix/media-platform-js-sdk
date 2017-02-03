var inherits = require('inherits');
var UploadEvent = require('./upload-event');

function UploadProgressEvent(target, loaded, total) {
    UploadEvent.call(this, target);

    /**
     * @type {string}
     */
    this.name = 'upload-progress';

    this.loaded = loaded;

    this.total = total;
}
inherits(UploadProgressEvent, UploadEvent);

/***
 * @type {UploadProgressEvent}
 */
module.exports = UploadProgressEvent;