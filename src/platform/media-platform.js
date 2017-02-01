var Configuration = require('./configuration/configuration');
var Authenticator = require('./authentication/authenticator');
var HTTPClient = require('./http/http-client');
var FileManager = require('./management/file-manager');

/**
 * @param {Configuration} config
 * @constructor
 */
function MediaPlatform(config) {

    //TODO: validate config

    var configuration = new Configuration(config.domain, config.sharedSecret, config.appId);
    var authenticator = new Authenticator(configuration);
    var httpClient = new HTTPClient(authenticator);
    this.getAuthenticationHeader = authenticator.getHeader;
    this.fileManager = new FileManager(configuration, httpClient);
}

/**
 * @type {MediaPlatform}
 */
module.exports = MediaPlatform;