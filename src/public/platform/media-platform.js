import {HTTPClient} from './http/browser-http-client';
import {FileUploader} from './uploader/browser-file-uploader';
import {QueuedFileUploader} from './uploader/queued-file-uploader';
import {FileDownloader} from './downloader/browser-file-downloader';
import {FileManager} from '../../platform/management/file-manager';
import {ArchiveManager} from '../../platform/management/archive-manager';
import {JobManager} from '../../platform/management/job-manager';
import {TranscodeManager} from '../../platform/management/transcode-manager';
import {FlowManager} from '../../platform/management/flow-manager';
import {LiveManager} from '../../platform/management/live-manager';
import {ImageManager} from '../../platform/management/image-manager';

/**
 * @param {Configuration} configuration
 * @constructor
 */

class MediaPlatform {
  constructor(configuration) {
    /**
     * @type {HTTPClient}
     */
    const browserHTTPClient = new HTTPClient(configuration.authenticationUrl);
    /**
     * @type {FileUploader}
     */
    const fileUploader = new FileUploader(configuration, browserHTTPClient);
    /**
     * @type {QueuedFileUploader}
     */
    const queuedFileUploader = new QueuedFileUploader(fileUploader);

    /**
     * @type {FileDownloader}
     */
    const fileDownloader = new FileDownloader(configuration, browserHTTPClient);

    /**
     * retrieve the auth header for the currently logged in user
     * @param {function(Error, {Authorization: <string>} | null)} callback
     */
    this.getAuthorizationHeader = function (callback) {
      browserHTTPClient.getAuthorizationHeader(callback);
    };

    /**
     * log out the user
     */
    this.deauthorize = function () {
      browserHTTPClient.deauthorize();
    };

    /**
     * @type {ArchiveManager}
     */
    this.archiveManager = new ArchiveManager(configuration, browserHTTPClient);

    /**
     * @type {FileManager}
     */
    this.fileManager = new FileManager(configuration, browserHTTPClient, fileUploader);

    /**
     * @param {UploadJob} uploadJob
     * @returns {QueuedFileUploader}
     */
    this.fileManager.queueFileUpload = function (uploadJob) {
      return queuedFileUploader.enqueue(uploadJob);
    };

    /**
     * @param {string} path
     * @param {DownloadUrlRequest?} downloadUrlRequest
     * @param {function(Error, *)} callback
     */
    this.getDownloadUrl = function (path, downloadUrlRequest, callback) {
      fileDownloader.getDownloadUrl(path, downloadUrlRequest, callback);
    };

    /**
     * @type {JobManager}
     */
    this.jobManager = new JobManager(configuration, browserHTTPClient);

    /**
     * @type {TranscodeManager}
     */
    this.transcodeManager = new TranscodeManager(configuration, browserHTTPClient);

    /**
     * @type {LiveManager}
     */
    this.liveManager = new LiveManager(configuration, browserHTTPClient);

    /**
     * @type {FlowManager}
     */
    this.flowManager = new FlowManager(configuration, browserHTTPClient);

    /**
     * @type {ImageManager}
     */
    this.imageManager = new ImageManager(configuration, browserHTTPClient);
  }
}

/**
 * @type {MediaPlatform}
 */
export default MediaPlatform;
export {MediaPlatform};
