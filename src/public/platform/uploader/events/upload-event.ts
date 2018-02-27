import {UploadJob} from '../upload-job';

export interface UploadEventResponse {
  [key: string]: any;
}

export class UploadEvent {
  public name: string = '';

  /**
   * @param {UploadJob} target
   * @param {object?} response
   * @constructor
   * @protected
   */
  constructor(public target: UploadJob, public response: UploadEventResponse | null = null) {
  }
}

