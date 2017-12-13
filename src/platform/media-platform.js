var Configuration = require('./configuration/configuration');
var Authenticator = require('./authentication/authenticator');
var HTTPClient = require('./http/http-client');
var FileUploader = require('./management/file-uploader');
var FileDownloader = require('./management/file-downloader');
var FileManager = require('./management/file-manager');
var ArchiveManager = require('./management/archive-manager');
var JobManager = require('./management/job-manager');
var TranscodeManager = require('./management/transcode-manager');
var FlowManager = require('./management/flow-manager');
var LiveManager = require('./management/live-manager');
var WebhookDeserializer = require('./webhook/webhook-deserializer');

/**
 * @param {Configuration} config
 * @constructor
 */
function MediaPlatform(config) {

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
     * @type {WebhookDeserializer}
     */
    this.webhookDeserializer = new WebhookDeserializer(authenticator)
}

/**
 * @type {MediaPlatform}
 */
module.exports = MediaPlatform;