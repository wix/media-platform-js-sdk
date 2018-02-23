import {UploadEvent} from './upload-event';

class UploadProgressEvent extends  UploadEvent {
  constructor(target, loaded, total) {
    super(target);

    /**
     * @type {string}
     */
    this.name = 'upload-progress';

    this.loaded = loaded;

    this.total = total;
  }
}

/***
 * @type {UploadProgressEvent}
 */
export default UploadProgressEvent;
export {UploadProgressEvent};
