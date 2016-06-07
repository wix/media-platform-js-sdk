/**
 * Created by elad on 06/06/2016.
 */

/**
 * @param {string} domain
 * @param {string?} sharedSecret
 * @abstract
 * @constructor
 */
function ProviderConfiguration(domain, sharedSecret) {

    /**
     * @type {string}
     */
    this.domain = domain;

    /**
     * @type {string}
     */
    this.sharedSecret = sharedSecret;
}

/**
 * @type {ProviderConfiguration}
 */
module.exports = ProviderConfiguration;