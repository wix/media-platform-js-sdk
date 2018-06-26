import { FilesSearch } from '../../platform/management/files-search';
import {ImageExtractionManager} from '../../platform/management/image-extraction-manager';
import {HTTPClient} from './http/browser-http-client';
import {FileUploader} from './uploader/browser-file-uploader';
import {QueuedFileUploader} from './uploader/queued-file-uploader';
import {FileDownloader} from './downloader/browser-file-downloader';
import {FileManager} from '../../platform/management/file-manager';
import {ArchiveManager} from '../../platform/management/archive-manager';
import {JobManager} from '../../platform/management/job-manager';
import {TranscodeManager, AVManager} from '../../platform/management/av-manager';
import {FlowManager} from '../../platform/management/flow-manager';
import {LiveManager} from '../../platform/management/live-manager';
import {ImageManager} from '../../platform/management/image-manager';
import {Configuration} from './configuration/configuration';
import {AuthorizationHeader} from '../../types/media-platform/media-platform';
import {UploadJob} from './uploader/upload-job';
import {DownloadUrlRequest} from '../../platform/management/requests/download-url-request';
import {WidgetInstanceManager} from '../../platform/management/widgets/widget-instance-manager/widget-instance-manager';
import {deprecatedFn} from '../../utils/deprecated/deprecated';
import {DownloadUrl} from '../../types/files/download-url';

/**
 * Media Platform Public
 * @param {Configuration} configuration
 * @constructor
 * @doc MediaPlatformPublic
 */
class MediaPlatform {
  private browserHTTPClient: HTTPClient;
  private fileDownloader: FileDownloader;
  public archiveManager: ArchiveManager;
  public fileManager: FileManager;
  public jobManager: JobManager;
  public transcodeManager: TranscodeManager;
  public avManager: AVManager;
  public liveManager: LiveManager;
  public flowManager: FlowManager;
  public imageManager: ImageManager;
  public widgetInstancesManager: WidgetInstanceManager;
  public imageExtractionManager: ImageExtractionManager;
  public filesSearch: FilesSearch;

  /**
   * constructor
   * @param {Configuration} configuration
   */
  constructor(configuration: Configuration) {
    this.browserHTTPClient = new HTTPClient(configuration.authenticationUrl);
    const fileUploader = new FileUploader(configuration, this.browserHTTPClient);
    const queuedFileUploader = new QueuedFileUploader(fileUploader);
    this.fileDownloader = new FileDownloader(configuration, this.browserHTTPClient);
    this.archiveManager = new ArchiveManager(configuration, this.browserHTTPClient);
    this.fileManager = new FileManager(configuration, this.browserHTTPClient, fileUploader);

    /**
     * queueFileUpload
     * @param {UploadJob} uploadJob
     * @returns {QueuedFileUploader}
     */
    this.fileManager.queueFileUpload = (uploadJob: UploadJob) => queuedFileUploader.enqueue(uploadJob);

    this.jobManager = new JobManager(configuration, this.browserHTTPClient);
    this.transcodeManager = new TranscodeManager(configuration, this.browserHTTPClient);
    this.avManager = new AVManager(configuration, this.browserHTTPClient);
    this.liveManager = new LiveManager(configuration, this.browserHTTPClient);
    this.flowManager = new FlowManager(configuration, this.browserHTTPClient);
    this.imageManager = new ImageManager(configuration, this.browserHTTPClient);
    this.widgetInstancesManager = new WidgetInstanceManager(configuration, this.browserHTTPClient);
    this.imageExtractionManager = new ImageExtractionManager(configuration, this.browserHTTPClient);
    this.filesSearch = new FilesSearch(configuration, this.browserHTTPClient);
  }

  /**
   * retrieve the auth header for the currently logged in user
   * @param callback DEPRECATED: use promise response instead
   */
  public getAuthorizationHeader(callback?: (error: Error | null, authorization: AuthorizationHeader | null) => void): Promise<AuthorizationHeader> {
    const authenticationHeaderPromise = this.browserHTTPClient.getAuthorizationHeader();

    if (callback === undefined) {
      return authenticationHeaderPromise;
    }

    callback = deprecatedFn('MediaPlatform.getAuthorizationHeader. Use promise response instead')(callback);

    return authenticationHeaderPromise
      .then(authorization => {
        if (callback) {
          callback(null, authorization);
        }
        return authorization;
      }, (error) => {
        if (callback) {
          callback(error, null);
        }
        return Promise.reject(error);
      });
  }

  /**
   * log out the user
   */
  public deauthorize() {
    this.browserHTTPClient.deauthorize();
  }

  /**
   * get download url
   * @param path
   * @param downloadUrlRequest
   * @param callback DEPRECATED! use promise response instead
   */
  getDownloadUrl(path: string, downloadUrlRequest: DownloadUrlRequest | undefined, callback?: (error: Error | null, payload: DownloadUrl | null) => void): Promise<DownloadUrl> {
    if (callback) {
      callback = deprecatedFn('MediaPlatform.getDownloadUrl. Use promise response instead')(callback);
    }
    return this.fileDownloader.getDownloadUrl(path, downloadUrlRequest)
      .then(response => {
        if (callback) {
          callback(null, response);
        }
        return response;
      }, (error) => {
        if (callback) {
          callback(error, null);
        }
        return Promise.reject(error);
      });
  }
}

/**
 * @type {MediaPlatform}
 */
export default MediaPlatform;
export {MediaPlatform};
