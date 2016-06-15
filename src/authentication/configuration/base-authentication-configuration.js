/**
 * @constructor
 * @abstract
 */
function BaseAuthenticationConfiguration(configuration, serviceMode, path) {

    /**
     * @type {string}
     */
    this.host = 'users.' + configuration.domain;

    /**
     * @type {string}
     */
    this.path = path;
    
    /**
     * @type {ServiceMode}
     */
    this.serviceMode = serviceMode;

    /**
     * @type {string}
     */
    this.sharedSecret = configuration.sharedSecret;

}

/**
 * @type {BaseAuthenticationConfiguration}
 */
module.exports = BaseAuthenticationConfiguration;