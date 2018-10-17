import {EventEmitter} from 'eventemitter3';

import {FileDescriptor} from '../../../platform/management/metadata/file-descriptor';
import {UploadFileRequest} from '../../../platform/management/requests/upload-file-request';
import {UploadUrlRequest} from '../../../platform/management/requests/upload-url-request';
import {ACL} from '../../../types/media-platform/media-platform';

import {FileUploader} from './browser-file-uploader';
import {UploadAbortedEvent} from './events/upload-aborted-event';
import {UploadErrorEvent} from './events/upload-error-event';
import {UploadProgressEvent} from './events/upload-progress-event';
import {UploadStartedEvent} from './events/upload-started-event';
import {UploadSuccessEvent} from './events/upload-success-event';


export enum UploadJobState {
  STOPPED = 'stopped',
  RUNNING = 'running',
}

export interface IUploadJob {
  path?: string;
  file?: File;
  uploadFileRequest?: UploadFileRequest;
}

/**
 * @param {string?} path
 * @param {File?} file
 * @param {UploadFileRequest?} uploadFileRequest
 * @constructor
 * @extends {EventEmitter}
 */
export class UploadJob extends EventEmitter {
  public state: UploadJobState = UploadJobState.STOPPED;
  private request: XMLHttpRequest;
  private file;
  private path;
  private uploadFileRequest;

  constructor({path, file, uploadFileRequest}: IUploadJob) {
    super();

    this.file = file;
    this.path = path;
    this.uploadFileRequest = uploadFileRequest;
  }

  /**
   * @param fileUploader
   * @returns {UploadJob}
   */
  run(fileUploader: FileUploader): this {
    if (this.state === UploadJobState.RUNNING) {
      console.warn('job already running');
      return this;
    }

    if (!this.file) {
      throw Error('no file');
    }

    this.state = UploadJobState.RUNNING;

    let acl = ACL.PUBLIC;

    if (this.uploadFileRequest && this.uploadFileRequest.acl) {
      acl = this.uploadFileRequest.acl;
    }

    const uploadStartedEvent = new UploadStartedEvent(this);
    this.emit(uploadStartedEvent.name, uploadStartedEvent);

    const uploadUrlRequest = new UploadUrlRequest({
      acl,
      mimeType: this.file.type,
      path: this.path,
      size: this.file.size
    });

    fileUploader
      .getUploadUrl(uploadUrlRequest)
      .then(response => {
          const onProgress = (event: ProgressEvent) => {
            const e = new UploadProgressEvent(this, event.loaded, event.total);
            this.emit(e.name, e);
          };

          const onLoad = (event) => {
            let e;
            if (event.target.status >= 400) {
              e = new UploadErrorEvent(this, event.target.response);
            } else {
              const payload =
                typeof event.target.response === 'string'
                  ? JSON.parse(event.target.response).payload
                  : event.target.response.payload;
              const fileDescriptors = payload.map((file) => {
                return new FileDescriptor(file);
              });

              e = new UploadSuccessEvent(this, event.target.response, fileDescriptors);
            }

            this.emit(e.name, e);
          };

          const onError = () => {
            const e = new UploadErrorEvent(this, request.response);
            this.emit(e.name, e);
          };

          const onAbort = (event) => {
            const e = new UploadAbortedEvent(event.target);
            this.emit(e.name, e);
          };

          const onLoadEnd = () => {
            reset();
            this.emit('upload-end');
          };

          const reset = () => {
            if (request.upload) {
              request.upload.removeEventListener('progress', onProgress);
            } else {
              request.removeEventListener('progress', onProgress);
            }
            request.removeEventListener('load', onLoad);
            request.removeEventListener('error', onError);
            request.removeEventListener('abort', onAbort);
            request.removeEventListener('loadend', onLoadEnd);
            this.state = UploadJobState.STOPPED;
          };

          const formData = new FormData();
          formData.append('uploadToken', response.uploadToken);
          if (this.path !== undefined) {
            formData.append('path', this.path);
          }
          if (this.file !== undefined) {
            formData.append('file', this.file);
          }
          formData.append('acl', acl);

          const request = this.request = new XMLHttpRequest();

          if (request.upload) {
            request.upload.addEventListener('progress', onProgress);
          } else {
            request.addEventListener('progress', onProgress);
          }
          request.addEventListener('load', onLoad);
          request.addEventListener('error', onError);
          request.addEventListener('abort', onAbort);
          request.addEventListener('loadend', onLoadEnd);

          request.open('POST', response.uploadUrl);

          request.withCredentials = true;
          request.responseType = 'json';

          request.send(formData);
        },
        error => {
          const e = new UploadErrorEvent(this, error);
          this.emit(e.name, e);
        }
      );

    return this;
  }

  public abort() {
    if (this.state !== UploadJobState.RUNNING) {
      throw Error('Job is not running');
    }
    if (this.request) {
      this.request.abort();
    }
  }
}
