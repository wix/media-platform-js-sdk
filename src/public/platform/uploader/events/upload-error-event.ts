import { UploadEvent } from './upload-event';

/**
 * @param {UploadJob} target
 * @param {object} response
 * @constructor
 */

class UploadErrorEvent extends UploadEvent {
  constructor(target, response) {
    super(target, response);

    /**
     * @type {string}
     */
    this.name = 'upload-error';
  }
}

/**
 * @type {UploadErrorEvent}
 */
export { UploadErrorEvent };
