import { AuthorizationHeader, DownloadURLObject, } from '../types/media-platform/media-platform';
import { Authenticator } from './authentication/authenticator';
import { Token } from './authentication/token';
import { Configuration, IConfiguration } from './configuration/configuration';
import { HTTPClient } from './http/http-client';
import { ArchiveManager } from './management/archive-manager';
import { AVManager } from './management/av-manager';
import { FileDownloader } from './management/file-downloader';
import { FileManager } from './management/file-manager';
import { FileUploader } from './management/file-uploader';
import { FlowManager } from './management/flow-manager';
import { ImageExtractionManager } from './management/image-extraction-manager';
import { ServerImageManager } from './management/server-image-manager';
import { JobManager } from './management/job-manager';
import { LiveManager } from './management/live-manager';
import { WidgetInstanceManager } from './management/widgets/widget-instance-manager/widget-instance-manager';
import { WebhookDeserializer } from './webhook/webhook-deserializer';
import { AudioManager } from './management/audio-manager';
import { SignedDownloadUrlRequest } from './management/requests/signed-download-url-request';

/**
 * Media Platform
 * @param {Configuration} config
 * @doc MediaPlatform
 */
export class MediaPlatform {
  private readonly authenticator: Authenticator;
  private readonly fileDownloader: FileDownloader;

  public archiveManager: ArchiveManager;
  public fileManager: FileManager;
  public audioManager: AudioManager;
  public avManager: AVManager;
  public flowManager: FlowManager;
  public liveManager: LiveManager;
  public jobManager: JobManager;
  public imageManager: ServerImageManager;
  public widgetInstancesManager: WidgetInstanceManager;
  public webhookDeserializer: WebhookDeserializer;
  public imageExtractionManager: ImageExtractionManager;

  /**
   * constructor
   * @param {IConfiguration} config
   */
  constructor(config: IConfiguration) {
    // TODO: validate config
    const configuration = new Configuration(
      config.domain,
      config.sharedSecret,
      config.appId,
    );
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
     * @type {AudioManager}
     */
    this.audioManager = new AudioManager(configuration, httpClient);

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
     * @type {ServerImageManager}
     */
    this.imageManager = new ServerImageManager(
      configuration,
      httpClient,
      this.authenticator,
    );

    /**
     * @type {WidgetInstanceManager}
     */
    this.widgetInstancesManager = new WidgetInstanceManager(
      configuration,
      httpClient,
    );

    /**
     * @type {WebhookDeserializer}
     */
    this.webhookDeserializer = new WebhookDeserializer(this.authenticator);

    /**
     * @type {ImageExtractionManager}
     */
    this.imageExtractionManager = new ImageExtractionManager(
      configuration,
      httpClient,
    );
  }

  public getAuthorizationHeader(token?: Token): AuthorizationHeader {
    return this.authenticator.getHeader(token);
  }

  public getSignedUrl(
    path: string,
    signedDownloadUrlRequest?: SignedDownloadUrlRequest,
  ): DownloadURLObject {
    return this.fileDownloader.getSignedUrl(path, signedDownloadUrlRequest);
  }
}
