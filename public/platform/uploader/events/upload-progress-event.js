import inherits from 'inherits';
import {UploadEvent} from './upload-event';

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
export default UploadProgressEvent;
export {UploadProgressEvent};
