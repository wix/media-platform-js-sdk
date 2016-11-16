/**
 * @param {string} domain
 * @param {string} authenticationUrl
 * @constructor
 */
function Configuration(domain, authenticationUrl) {

    /**
     * @type {string}
     */
    this.domain = domain;

    /**
     * @type {string}
     */
    this.authenticationUrl = authenticationUrl;
}