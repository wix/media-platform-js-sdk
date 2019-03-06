import { UploadEvent, UploadEventResponse } from './upload-event';
import { FileDescriptor } from '../../../../platform/management/metadata/file-descriptor';

class UploadSuccessEvent extends UploadEvent {
  constructor(
    target,
    response: UploadEventResponse,
    public fileDescriptors: FileDescriptor[],
  ) {
    super(target, response);

    this.name = 'upload-success';
    this.fileDescriptors = fileDescriptors;
  }
}

/**
 * @type {UploadSuccessEvent}
 */
export { UploadSuccessEvent };
