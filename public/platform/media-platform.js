var HTTPClient = require('./http/browser-http-client');
var FileUploader = require('./uploader/browser-file-uploader');
var QueuedFileUploader = require('./uploader/queued-file-uploader');
var FileDownloader = require('./downloader/browser-file-downloader');
var FileManager = require('../../src/platform/management/file-manager');
var ArchiveManager = require('../../src/platform/management/archive-manager');
var JobManager = require('../../src/platform/management/job-manager');
var TranscodeManager = require('../../src/platform/management/transcode-manager');
var FlowManager = require('../../src/platform/management/flow-manager');
var LiveManager = require('../../src/platform/management/live-manager');

/**
 * @param {Configuration} configuration
 * @constructor
 */
function MediaPlatform(configuration) {

    /**
     * @type {HTTPClient}
     */
    var browserHTTPClient = new HTTPClient(configuration.authenticationUrl);
    /**
     * @type {FileUploader}
     */
    var fileUploader = new FileUploader(configuration, browserHTTPClient);
    /**
     * @type {QueuedFileUploader}
     */
    var queuedFileUploader = new QueuedFileUploader(fileUploader);

    /**
     * @type {FileDownloader}
     */
    var fileDownloader = new FileDownloader(configuration, browserHTTPClient);

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
}

/**
 * @type {MediaPlatform}
 */
module.exports = MediaPlatform;