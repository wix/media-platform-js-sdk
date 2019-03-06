import { UploadEvent } from './upload-event';

export class UploadProgressEvent extends UploadEvent {
  constructor(target, public loaded: number, public total: number) {
    super(target);

    /**
     * @type {string}
     */
    this.name = 'upload-progress';

    this.loaded = loaded;

    this.total = total;
  }
}
