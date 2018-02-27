import {UploadEvent} from './upload-event';


export class UploadAbortedEvent extends UploadEvent {
  public name: string = 'upload-aborted';
  constructor(target) {
    super(target);
  }
}
