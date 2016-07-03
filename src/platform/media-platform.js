var AppConfiguration = require('./configuration/app-configuration');
var AppAuthenticationConfiguration = require('./authentication/configuration/app-authentication-configuration');
var ProviderConfiguration = require('./configuration/provider-configuration');
var ProviderAuthenticationConfiguration = require('./authentication/configuration/provider-authentication-configuration');
var AuthenticationFacade = require('./authentication/authentication-facade');
var AuthenticatedHTTPClient = require('./http/authenticated-http-client');
var FileUploader = require('./upload/file-uploader');
var AppFileUploader = require('./upload/app-file-uploader');
var FileManager = require('./management/file-manager');
var AppFileManager = require('./management/app-file-manager');
var CollectionManager = require('./collection/collection-manager');
var AppCollectionManager = require('./collection/app-collection-manager');

/**
 * @param {Object} config
 * @constructor
 */
function MediaPlatform(config) {
    
    //TODO: validate config

    var configuration = null;
    var authConfiguration = null;
    var authenticationFacade = null;
    var authenticatedHTTPClient = null;
    if (config.hasOwnProperty('apiKey')) {
        configuration = new AppConfiguration(config.domain, config.apiKey, config.sharedSecret);
        authConfiguration = new AppAuthenticationConfiguration(configuration);
        authenticationFacade = new AuthenticationFacade(authConfiguration);
        authenticatedHTTPClient = new AuthenticatedHTTPClient(authenticationFacade);

        this.fileUploader = new AppFileUploader(configuration, new FileUploader(configuration, authenticationFacade));
        this.fileManager = new AppFileManager(configuration, new FileManager(configuration, authenticatedHTTPClient));
        this.collectionManager = new AppCollectionManager(configuration, new CollectionManager(configuration, authenticatedHTTPClient));
    } else {
        configuration = new ProviderConfiguration(config.domain, config.sharedSecret);
        authConfiguration = new ProviderAuthenticationConfiguration(configuration);
        authenticationFacade = new AuthenticationFacade(authConfiguration);
        authenticatedHTTPClient = new AuthenticatedHTTPClient(authenticationFacade);

        this.fileUploader = new FileUploader(configuration, authenticationFacade);
        this.fileManager = new FileManager(configuration, authenticatedHTTPClient);
        this.collectionManager = new CollectionManager(configuration, authenticatedHTTPClient);
    }
}

/**
 * @type {MediaPlatform}
 */
module.exports = MediaPlatform;