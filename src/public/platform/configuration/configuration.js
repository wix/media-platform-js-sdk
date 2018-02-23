/**
 * @param {string} domain
 * @param {string} authenticationUrl
 * @constructor
 */

class Configuration {
  constructor(domain, authenticationUrl) {
    /**
     * @type {string}
     */
    this.domain = domain;

    /**
     * @type {string}
     */
    this.authenticationUrl = authenticationUrl;
  }
}

/**
 * @type {Configuration}
 */
export default Configuration;
export {Configuration};
