import { UploadEvent } from './upload-event';

class UploadStartedEvent extends UploadEvent {
  constructor(target) {
    super(target);

    /**
     * @type {string}
     */
    this.name = 'upload-started';
  }
}

/***
 * @type {UploadStartedEvent}
 */
export { UploadStartedEvent };
