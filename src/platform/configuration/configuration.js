/**
 * @param {string} domain
 * @param {string} sharedSecret
 * @param {string} appId
 * @constructor
 */
function Configuration(domain, sharedSecret, appId) {

    /**
     * @type {string}
     */
    this.domain = domain;

    /**
     * @type {string}
     */
    this.sharedSecret = sharedSecret;

    /**
     * @type {string}
     */
    this.appId = appId;
}

/**
 * @type {Configuration}
 */
module.exports = Configuration;