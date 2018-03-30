import {ImageExtractionManager} from '../../platform/management/image-extraction-manager';
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
import {Configuration} from './configuration/configuration';
import {AuthorizationHeader} from '../../types/media-platform/media-platform';
import {UploadJob} from './uploader/upload-job';
import {DownloadUrlRequest} from '../../platform/management/requests/download-url-request';
import {WidgetInstanceManager} from '../../platform/management/widgets/widget-instance-manager/widget-instance-manager';

/**
 * @param {Configuration} configuration
 * @constructor
 */

class MediaPlatform {
  private browserHTTPClient: HTTPClient;
  private fileDownloader: FileDownloader;
  public archiveManager: ArchiveManager;
  public fileManager: FileManager;
  public jobManager: JobManager;
  public transcodeManager: TranscodeManager;
  public liveManager: LiveManager;
  public flowManager: FlowManager;
  public imageManager: ImageManager;
  public widgetInstancesManager: WidgetInstanceManager;
  public imageExtractionManager: ImageExtractionManager;

  constructor(configuration: Configuration) {
    this.browserHTTPClient = new HTTPClient(configuration.authenticationUrl);
    const fileUploader = new FileUploader(configuration, this.browserHTTPClient);
    const queuedFileUploader = new QueuedFileUploader(fileUploader);
    this.fileDownloader = new FileDownloader(configuration, this.browserHTTPClient);
    this.archiveManager = new ArchiveManager(configuration, this.browserHTTPClient);
    this.fileManager = new FileManager(configuration, this.browserHTTPClient, fileUploader);

    /**
     * @param {UploadJob} uploadJob
     * @returns {QueuedFileUploader}
     */
    this.fileManager.queueFileUpload = function (uploadJob: UploadJob) {
      return queuedFileUploader.enqueue(uploadJob);
    };

    this.jobManager = new JobManager(configuration, this.browserHTTPClient);
    this.transcodeManager = new TranscodeManager(configuration, this.browserHTTPClient);
    this.liveManager = new LiveManager(configuration, this.browserHTTPClient);
    this.flowManager = new FlowManager(configuration, this.browserHTTPClient);
    this.imageManager = new ImageManager(configuration, this.browserHTTPClient);
    this.widgetInstancesManager = new WidgetInstanceManager(configuration, this.browserHTTPClient);
    this.imageExtractionManager = new ImageExtractionManager(configuration, this.browserHTTPClient);
  }

  /**
   * retrieve the auth header for the currently logged in user
   * @param {function(Error, {Authorization: <string>} | null)} callback
   */
  public getAuthorizationHeader(callback: (error: Error | null, authorization: AuthorizationHeader | null) => void) {
    this.browserHTTPClient.getAuthorizationHeader(callback);
  }

  /**
   * log out the user
   */
  public deauthorize() {
    this.browserHTTPClient.deauthorize();
  }

  getDownloadUrl(path: string, downloadUrlRequest: DownloadUrlRequest | undefined, callback: (error: Error | null, response: any) => void) {
    this.fileDownloader.getDownloadUrl(path, downloadUrlRequest, callback);
  }
}

/**
 * @type {MediaPlatform}
 */
export default MediaPlatform;
export {MediaPlatform};
