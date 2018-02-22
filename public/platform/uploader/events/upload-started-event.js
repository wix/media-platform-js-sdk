import inherits from 'inherits';
import {UploadEvent} from './upload-event';

class UploadStartedEvent {
  constructor(target) {
    UploadEvent.call(this, target);

    /**
     * @type {string}
     */
    this.name = 'upload-started';
  }
}

inherits(UploadStartedEvent, UploadEvent);

/***
 * @type {UploadStartedEvent}
 */
export default UploadStartedEvent;
export {UploadStartedEvent};
