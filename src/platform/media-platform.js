import {Configuration} from './configuration/configuration';
import {Authenticator} from './authentication/authenticator';
import {HTTPClient} from './http/http-client';
import {FileUploader} from './management/file-uploader';
import {FileDownloader} from './management/file-downloader';
import {FileManager} from './management/file-manager';
import {ArchiveManager} from './management/archive-manager';
import {JobManager} from './management/job-manager';
import {ImageManager} from './management/image-manager';
import {TranscodeManager} from './management/transcode-manager';
import {FlowManager} from './management/flow-manager';
import {LiveManager} from './management/live-manager';
import {WebhookDeserializer} from './webhook/webhook-deserializer';

/**
 * @param {Configuration} config
 * @constructor
 */
export class MediaPlatform {
  constructor(config) {
    // TODO: validate config

    var configuration = new Configuration(config.domain, config.sharedSecret, config.appId);
    var authenticator = new Authenticator(configuration);
    var httpClient = new HTTPClient(authenticator);
    var fileUploader = new FileUploader(configuration, httpClient);
    var fileDownloader = new FileDownloader(configuration, authenticator);

    /**
     * @param {Token?} token
     * @returns {{Authorization: <string>}}
     */
    this.getAuthorizationHeader = function (token) {
      return authenticator.getHeader(token);
    };

    /**
     * @param {string} path
     * @param {DownloadUrlRequest?} downloadUrlRequest
     * @returns {{downloadUrl: string}}
     */
    this.getDownloadUrl = function (path, downloadUrlRequest) {
      return fileDownloader.getDownloadUrl(path, downloadUrlRequest);
    };

    /**
     * @type {ArchiveManager}
     */
    this.archiveManager = new ArchiveManager(configuration, httpClient);

    /**
     * @type {FileManager}
     */
    this.fileManager = new FileManager(configuration, httpClient, fileUploader);

    /**
     * @type {TranscodeManager}
     */
    this.transcodeManager = new TranscodeManager(configuration, httpClient);

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
     * @type {WebhookDeserializer}
     */
    this.webhookDeserializer = new WebhookDeserializer(authenticator);
  }
}
