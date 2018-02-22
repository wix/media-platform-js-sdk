import inherits from 'inherits';
import {UploadEvent} from './upload-event';

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
export default UploadAbortedEvent;
export {UploadAbortedEvent};
