import inherits from 'inherits';
import {UploadEvent} from './upload-event';

/**
 * @param {UploadJob} target
 * @param {object} response
 * @constructor
 */

class UploadErrorEvent {
  constructor(target, response) {
    UploadEvent.call(this, target, response);

    /**
     * @type {string}
     */
    this.name = 'upload-error';
  }
}

inherits(UploadErrorEvent, UploadEvent);

/**
 * @type {UploadErrorEvent}
 */
export default UploadErrorEvent;
export {UploadErrorEvent};
