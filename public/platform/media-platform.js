var HTTPClient = require('./http/browser-http-client');
var FileUploader = require('./uploader/browser-file-uploader');
var QueuedFileUploader = require('./uploader/queued-file-uploader');
var FileManager = require('../../src/platform/management/file-manager');

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
    }
}

/**
 * @type {MediaPlatform}
 */
module.exports = MediaPlatform;