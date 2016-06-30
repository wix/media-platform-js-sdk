var AppConfiguration = require('./configuration/app-configuration');
var AppAuthenticationConfiguration = require('./authentication/configuration/app-authentication-configuration');
var ProviderConfiguration = require('./configuration/provider-configuration');
var ProviderAuthenticationConfiguration = require('./authentication/configuration/provider-authentication-configuration');
var AuthenticationFacade = require('./authentication/authentication-facade');
var FileUploader = require('./upload/file-uploader');
var AppFileUploader = require('./upload/app-file-uploader');
var FileManager = require('./management/file-manager');
var AppFileManager = require('./management/app-file-manager');

/**
 * @param {Object} config
 * @constructor
 */
function MediaPlatform(config) {

    var configuration = null;
    var authConfiguration = null;
    var authenticationFacade = null;
    if (config.hasOwnProperty('apiKey')) {
        configuration = new AppConfiguration(config.domain, config.apiKey, config.sharedSecret);
        authConfiguration = new AppAuthenticationConfiguration(configuration);
        authenticationFacade = new AuthenticationFacade(authConfiguration);

        this.fileUploader = new AppFileUploader(configuration, new FileUploader(configuration, authenticationFacade));
        this.fileManager = new AppFileManager(configuration, new FileManager(configuration, authenticationFacade));
    } else {
        configuration = new ProviderConfiguration(config.domain, config.sharedSecret);
        authConfiguration = new ProviderAuthenticationConfiguration(configuration);
        authenticationFacade = new AuthenticationFacade(authConfiguration);

        this.fileUploader = new FileUploader(configuration, authenticationFacade);
        this.fileManager = new FileManager(configuration, authenticationFacade);
    }
}

/**
 * @type {MediaPlatform}
 */
module.exports = MediaPlatform;