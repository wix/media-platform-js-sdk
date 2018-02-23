import {UploadEvent} from './upload-event';

/**
 * @param {UploadJob} target
 * @param {object} response
 * @param {Array<FileDescriptor>} fileDescriptors
 * @constructor
 */

class UploadSuccessEvent extends UploadEvent {
  constructor(target, response, fileDescriptors) {
    super(target, response);

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

/**
 * @type {UploadSuccessEvent}
 */
export {UploadSuccessEvent};
