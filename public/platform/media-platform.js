var HTTPClient = require('./http/browser-http-client');
var FileUploader = require('./uploader/browser-file-uploader');
var FileManager = require('../../src/platform/management/file-manager');
var QueuedFileUploader = require('./uploader/queued-file-uploader');

/**
 * @param {Configuration} configuration
 * @constructor
 */
function MediaPlatform(configuration) {

    var browserHTTPClient = new HTTPClient(configuration.authenticationUrl);
    var fileUploader = new FileUploader(configuration, browserHTTPClient);

    /**
     * retrieve the auth header for the currently logged in user
     * @param callback
     */
    this.getAuthenticationHeader = function (callback) {
        browserHTTPClient.getAuthenticationHeader(callback);
    };

    /**
     * log out the user
     */
    this.deauthorize = function () {
        browserHTTPClient.deauthorize();
    };

    this.fileManager = new FileManager(configuration, browserHTTPClient, fileUploader);
    this.queuedFileUploader = new QueuedFileUploader(fileUploader);
}

/**
 * @type {MediaPlatform}
 */
module.exports = MediaPlatform;