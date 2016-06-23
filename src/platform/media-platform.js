var AppConfiguration = require('./configuration/app-configuration');
var AppAuthenticationConfiguration = require('./authentication/configuration/app-authentication-configuration');
var ProviderConfiguration = require('./configuration/provider-configuration');
var ProviderAuthenticationConfiguration = require('./authentication/configuration/provider-authentication-configuration');
var AuthenticationFacade = require('./authentication/authentication-facade');
var FileUploader = require('./upload/file-uploader');

/**
 * @param {Object} config
 * @constructor
 */
function MediaPlatform(config) {

    var configuration = null;
    var authConfiguration = null;
    if (config.hasOwnProperty('apiKey')) {
        configuration = new AppConfiguration(config.domain, config.apiKey, config.sharedSecret);
        authConfiguration = new AppAuthenticationConfiguration(configuration);
    } else {
        configuration = new ProviderConfiguration(config.domain, config.sharedSecret);
        authConfiguration = new ProviderAuthenticationConfiguration(configuration);
    }
    
    var authenticationFacade = new AuthenticationFacade(authConfiguration);

    /**
     * @type {FileUploader}
     */
    this.fileUploader = new FileUploader(configuration, authenticationFacade);
}

/**
 * @type {MediaPlatform}
 */
module.exports = MediaPlatform;