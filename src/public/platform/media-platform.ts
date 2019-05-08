import { ArchiveManager } from '../../platform/management/archive-manager';
import { AVManager } from '../../platform/management/av-manager';
import { FileManager } from '../../platform/management/file-manager';
import { FlowManager } from '../../platform/management/flow-manager';
import { ImageExtractionManager } from '../../platform/management/image-extraction-manager';
import { ImageManager } from '../../platform/management/image-manager';
import { JobManager } from '../../platform/management/job-manager';
import { LiveManager } from '../../platform/management/live-manager';
import { DownloadUrlRequest } from '../../platform/management/requests/download-url-request';
import { WidgetInstanceManager } from '../../platform/management/widgets/widget-instance-manager/widget-instance-manager';
import { DownloadUrl } from '../../types/files/download-url';
import { AuthorizationHeader } from '../../types/media-platform/media-platform';

import { Configuration } from './configuration/configuration';
import { FileDownloader } from './downloader/browser-file-downloader';
import { HTTPClient } from './http/browser-http-client';
import { FileUploader } from './uploader/browser-file-uploader';
import { QueuedFileUploader } from './uploader/queued-file-uploader';
import { UploadJob } from './uploader/upload-job';
import { AudioManager } from '../../platform/management/audio-manager';

/**
 * Media Platform Public
 * @param {Configuration} configuration
 * @constructor
 * @doc MediaPlatformPublic
 */
class MediaPlatform {
  private readonly browserHTTPClient: HTTPClient;
  private readonly fileDownloader: FileDownloader;
  public archiveManager: ArchiveManager;
  public fileManager: FileManager;
  public jobManager: JobManager;
  public audioManager: AudioManager;
  public avManager: AVManager;
  public liveManager: LiveManager;
  public flowManager: FlowManager;
  public imageManager: ImageManager;
  public widgetInstancesManager: WidgetInstanceManager;
  public imageExtractionManager: ImageExtractionManager;

  /**
   * constructor
   * @param {Configuration} configuration
   */
  constructor(configuration: Configuration) {
    this.browserHTTPClient = new HTTPClient(
      configuration.authenticationUrl,
      configuration.authenticationHeaders,
    );
    const fileUploader = new FileUploader(
      configuration,
      this.browserHTTPClient,
    );
    const queuedFileUploader = new QueuedFileUploader(fileUploader);
    this.fileDownloader = new FileDownloader(
      configuration,
      this.browserHTTPClient,
    );
    this.archiveManager = new ArchiveManager(
      configuration,
      this.browserHTTPClient,
    );
    this.fileManager = new FileManager(
      configuration,
      this.browserHTTPClient,
      fileUploader,
    );
    this.fileManager.queueFileUpload = (uploadJob: UploadJob) =>
      queuedFileUploader.enqueue(uploadJob);

    this.jobManager = new JobManager(configuration, this.browserHTTPClient);
    this.audioManager = new AudioManager(configuration, this.browserHTTPClient);
    this.avManager = new AVManager(configuration, this.browserHTTPClient);
    this.liveManager = new LiveManager(configuration, this.browserHTTPClient);
    this.flowManager = new FlowManager(configuration, this.browserHTTPClient);
    this.imageManager = new ImageManager(configuration, this.browserHTTPClient);
    this.widgetInstancesManager = new WidgetInstanceManager(
      configuration,
      this.browserHTTPClient,
    );
    this.imageExtractionManager = new ImageExtractionManager(
      configuration,
      this.browserHTTPClient,
    );
  }

  /**
   * retrieve the auth header for the currently logged in user
   * @returns {Promise<AuthorizationHeader>}
   */
  public getAuthorizationHeader(): Promise<AuthorizationHeader> {
    const authenticationHeaderPromise = this.browserHTTPClient.getAuthorizationHeader();

    return authenticationHeaderPromise.catch(error => {
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
   * @param {string} path
   * @param {DownloadUrlRequest?} downloadUrlRequest
   * @returns {Promise<DownloadUrl>}
   */
  getDownloadUrl(
    path: string,
    downloadUrlRequest?: DownloadUrlRequest,
  ): Promise<DownloadUrl> {
    return this.fileDownloader.getDownloadUrl(path, downloadUrlRequest).then(
      response => {
        return response;
      },
      error => {
        return Promise.reject(error);
      },
    );
  }
}

/**
 * @type {MediaPlatform}
 */
export { MediaPlatform };
