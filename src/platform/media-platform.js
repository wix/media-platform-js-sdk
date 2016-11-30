var Configuration = require('./configuration/configuration');
var AuthenticationConfiguration = require('./authentication/configuration/authentication-configuration');
var AuthenticationFacade = require('./authentication/authentication-facade');
var AuthenticatedHTTPClient = require('./http/authenticated-http-client');
var FileUploader = require('./upload/file-uploader');
var FileDownloader = require('./download/file-downloader');
var FileManager = require('./management/file-manager');
var CollectionManager = require('./collection/collection-manager');

/**
 * @param {Configuration} config
 * @constructor
 */
function MediaPlatform(config) {

    //TODO: validate config

    var configuration = new Configuration(config.domain, config.sharedSecret, config.appId);
    var authConfiguration = new AuthenticationConfiguration(configuration);
    var authenticationFacade = new AuthenticationFacade(authConfiguration);
    var authenticatedHTTPClient = new AuthenticatedHTTPClient(authenticationFacade);
    this.getAuthenticationHeader = function (userId, callback) {
        authenticatedHTTPClient.getAuthenticationHeader(userId, callback);
    };
    this.fileUploader = new FileUploader(configuration, authenticatedHTTPClient);
    this.fileDownloader = new FileDownloader(configuration, authenticatedHTTPClient);
    this.fileManager = new FileManager(configuration, authenticatedHTTPClient);
    this.collectionManager = new CollectionManager(configuration, authenticatedHTTPClient);
}

/**
 * @type {MediaPlatform}
 */
module.exports = MediaPlatform;