var Configuration = require('./configuration/configuration');
var Authenticator = require('./authentication/authenticator');
var HTTPClient = require('./http/http-client');
var FileUploader = require('./management/file-uploader');
var FileManager = require('./management/file-manager');
var WebhookDeserializer = require('./webhook/webhook-deserializer');

/**
 * @param {Configuration} config
 * @constructor
 */
function MediaPlatform(config) {

    // TODO: validate config

    var configuration = new Configuration(config.domain, config.sharedSecret, config.appId);
    var authenticator = new Authenticator(configuration);
    var httpClient = new HTTPClient(authenticator);
    var fileUploader = new FileUploader(configuration, httpClient);

    /**
     * @param {Token?} token
     * @returns {{Authorization: <string>}}
     */
    this.getAuthorizationHeader = function (token) {
        return authenticator.getHeader(token);
    };

    /**
     * @type {FileManager}
     */
    this.fileManager = new FileManager(configuration, httpClient, fileUploader);

    /**
     * @type {WebhookDeserializer}
     */
    this.webhookDeserializer = new WebhookDeserializer(authenticator)
}

/**
 * @type {MediaPlatform}
 */
module.exports = MediaPlatform;