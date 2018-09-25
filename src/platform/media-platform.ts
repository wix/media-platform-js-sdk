import {AuthorizationHeader, DownloadURLObject} from '../types/media-platform/media-platform';
import {Authenticator} from './authentication/authenticator';
import {Token} from './authentication/token';
import {Configuration, IConfiguration} from './configuration/configuration';
import {HTTPClient} from './http/http-client';
import {ArchiveManager} from './management/archive-manager';
import {AVManager} from './management/av-manager';
import {FileDownloader} from './management/file-downloader';
import {FileManager} from './management/file-manager';
import {FileUploader} from './management/file-uploader';
import {FlowManager} from './management/flow-manager';
import {ImageExtractionManager} from './management/image-extraction-manager';
import {ImageManager} from './management/image-manager';
import {JobManager} from './management/job-manager';
import {LiveManager} from './management/live-manager';
import {DownloadUrlRequest} from './management/requests/download-url-request';
import {WidgetInstanceManager} from './management/widgets/widget-instance-manager/widget-instance-manager';
import {WebhookDeserializer} from './webhook/webhook-deserializer';

/**
 * Media Platform
 * @param {Configuration} config
 * @doc MediaPlatform
 */
export class MediaPlatform {
  private authenticator: Authenticator;
  private fileDownloader: FileDownloader;

  public archiveManager: ArchiveManager;
  public fileManager: FileManager;
  public avManager: AVManager;
  public flowManager: FlowManager;
  public liveManager: LiveManager;
  public jobManager: JobManager;
  public imageManager: ImageManager;
  public widgetInstancesManager: WidgetInstanceManager;
  public webhookDeserializer: WebhookDeserializer;
  public imageExtractionManager: ImageExtractionManager;

  /**
   * constructor
   * @param {IConfiguration} config
   */
  constructor(config: IConfiguration) {
    // TODO: validate config
    const configuration = new Configuration(config.domain, config.sharedSecret, config.appId);
    this.authenticator = new Authenticator(configuration);
    this.fileDownloader = new FileDownloader(configuration, this.authenticator);
    const httpClient = new HTTPClient(this.authenticator);
    const fileUploader = new FileUploader(configuration, httpClient);

    /**
     * @type {ArchiveManager}
     */
    this.archiveManager = new ArchiveManager(configuration, httpClient);

    /**
     * @type {FileManager}
     */
    this.fileManager = new FileManager(configuration, httpClient, fileUploader);

    /**
     * @type {AVManager}
     */
    this.avManager = new AVManager(configuration, httpClient);

    /**
     * @type {FlowManager}
     */
    this.flowManager = new FlowManager(configuration, httpClient);

    /**
     * @type {LiveManager}
     */
    this.liveManager = new LiveManager(configuration, httpClient);

    /**
     * @type {JobManager}
     */
    this.jobManager = new JobManager(configuration, httpClient);

    /**
     * @type {ImageManager}
     */
    this.imageManager = new ImageManager(configuration, httpClient);

    /**
     * @type {WidgetInstanceManager}
     */
    this.widgetInstancesManager = new WidgetInstanceManager(configuration, httpClient);

    /**
     * @type {WebhookDeserializer}
     */
    this.webhookDeserializer = new WebhookDeserializer(this.authenticator);

    /**
     * @type {ImageExtractionManager}
     */
    this.imageExtractionManager = new ImageExtractionManager(configuration, httpClient);
  }

  public getAuthorizationHeader(token?: Token): AuthorizationHeader {
    return this.authenticator.getHeader(token);
  }

  public getDownloadUrl(path: string, downloadUrlRequest?: DownloadUrlRequest): DownloadURLObject {
    return this.fileDownloader.getDownloadUrl(path, downloadUrlRequest);
  }
}
