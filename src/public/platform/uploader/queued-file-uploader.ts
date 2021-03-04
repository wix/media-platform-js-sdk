import { QueueObject } from 'async';
import * as queue from 'async/queue';

import { FileUploader } from './browser-file-uploader';
import { UploadJob } from './upload-job';

/**
 * @param {FileUploader} fileUploader
 * @param {number?} concurrency
 * @constructor
 */
export class QueuedFileUploader {
  public queue: QueueObject<UploadJob>;
  public jobs: UploadJob[] = [];

  constructor(
    public fileUploader: FileUploader,
    public concurrency: number = 4,
  ) {
    this.fileUploader = fileUploader;

    this.queue = queue(uploadWorker, concurrency);

    function uploadWorker(uploadJob: UploadJob, callback) {
      uploadJob.once('upload-end', callback);
      uploadJob.run(fileUploader);
    }

    this.jobs = [];
  }

  /**
   * @param {UploadJob} uploadJob
   * @returns {QueuedFileUploader}
   */
  enqueue(uploadJob: UploadJob): this {
    if (this.jobs.indexOf(uploadJob) > -1) {
      console.warn('upload job already queued');
      return this;
    }

    this.jobs.push(uploadJob);
    this.queue.push(uploadJob, () => {
      const i = this.jobs.indexOf(uploadJob);
      if (i > -1) {
        this.jobs.splice(i, 1);
      }
    });

    return this;
  }

  /**
   * @description pauses the queue, in flight request will continue to completion
   * @returns {QueuedFileUploader}
   */
  pause(): this {
    this.queue.pause();
    return this;
  }

  /**
   * @description resume a paused queue
   * @returns {QueuedFileUploader}
   */
  resume(): this {
    this.queue.resume();
    return this;
  }

  /**
   * @description purges the queue, this will not abort in flight requests
   * @returns {QueuedFileUploader}
   */
  kill(): this {
    this.queue.kill();
    this.jobs = [];
    return this;
  }

  /**
   * @description the number of of jobs left in the queue
   * @returns {*}
   */
  length(): number {
    return this.queue.length();
  }
}
