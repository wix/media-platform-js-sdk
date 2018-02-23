import {UploadEvent} from './upload-event';

/**
 * @param {UploadJob} target
 * @constructor
 */

class UploadAbortedEvent extends UploadEvent {
  constructor(target) {
    super(target);

    /**
     * @type {string}
     */
    this.name = 'upload-aborted';
  }
}

/**
 * @type {UploadAbortedEvent}
 */
export default UploadAbortedEvent;
export {UploadAbortedEvent};
