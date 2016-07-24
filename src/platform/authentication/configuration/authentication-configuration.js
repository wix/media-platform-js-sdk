/**
 * @param {Configuration} configuration
 * @constructor
 */
function AuthenticationConfiguration(configuration) {

    /**
     * @type {string}
     */
    this.host = configuration.domain;

    /**
     * @type {string}
     */
    this.sharedSecret = configuration.sharedSecret;

    /**
     * @type {string}
     */
    this.appId = configuration.appId;

    /**
     * @type {string}
     */
    this.path = '/apps/auth/token';
}

/**
 * @type {AuthenticationConfiguration}
 */
module.exports = AuthenticationConfiguration;