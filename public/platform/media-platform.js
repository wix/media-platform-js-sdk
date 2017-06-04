var HTTPClient = require('./http/browser-http-client');
var FileUploader = require('./uploader/browser-file-uploader');
var QueuedFileUploader = require('./uploader/queued-file-uploader');
var FileDownloader = require('./downloader/browser-file-downloader');
var FileManager = require('../../src/platform/management/file-manager');
var JobManager = require('../../src/platform/management/job-manager');

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
}

/**
 * @type {MediaPlatform}
 */
module.exports = MediaPlatform;