import inherits from 'inherits';
import {UploadEvent} from './upload-event';

/**
 * @param {UploadJob} target
 * @param {object} response
 * @param {Array<FileDescriptor>} fileDescriptors
 * @constructor
 */

class UploadSuccessEvent {
  constructor(target, response, fileDescriptors) {
    UploadEvent.call(this, target, response);

    /**
     * @type {string}
     */
    this.name = 'upload-success';

    /**
     * @type {Array<FileDescriptor>}
     */
    this.fileDescriptors = fileDescriptors;
  }
}

inherits(UploadSuccessEvent, UploadEvent);

/**
 * @type {UploadSuccessEvent}
 */
export default UploadSuccessEvent;
export {UploadSuccessEvent};
