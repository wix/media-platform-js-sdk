var BrowserHTTPClient = require('./http/browser-http-client');
var FileManager = require('../../src/platform/management/file-manager');
var FileUploader = require('./upload/file-uploader');

/**
 * @param {Configuration} configuration
 * @constructor
 */
function MediaPlatform(configuration) {

    var browserHTTPClient = new BrowserHTTPClient(configuration.authenticationUrl);
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

    //noinspection JSCheckFunctionSignatures
    this.fileManager = new FileManager(configuration, browserHTTPClient, fileUploader);
}

/**
 * @type {MediaPlatform}
 */
module.exports = MediaPlatform;