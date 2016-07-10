var AuthenticatedHTTPClient = require('./http/authenticated-http-client');
var FileManager = require('../../src/platform/management/file-manager');
var CollectionManager = require('../../src/platform/collection/collection-manager');
var FileUploader = require('./upload/file-uploader');

/**
 * @param {{domain: string, authenticationUrl: string}} configuration
 * @constructor
 */
function MediaPlatform(configuration) {

    var authenticatedHTTPClient = new AuthenticatedHTTPClient(configuration.authenticationUrl);

    /**
     * retrieve the auth header for the currently logged in user
     * @param callback
     */
    this.getAuthenticationHeader = function (callback) {
        authenticatedHTTPClient.getAuthenticationHeader(callback);
    };

    /**
     * log out the user
     */
    this.deauthorize = function () {
        authenticatedHTTPClient.deauthorize();
    };

    //noinspection JSCheckFunctionSignatures
    this.fileManager = new FileManager(configuration, authenticatedHTTPClient);
    //noinspection JSCheckFunctionSignatures
    this.collectionManager = new CollectionManager(configuration, authenticatedHTTPClient);

    this.fileUploader = new FileUploader(configuration, authenticatedHTTPClient);
}

/**
 * @type {MediaPlatform}
 */
module.exports = MediaPlatform;