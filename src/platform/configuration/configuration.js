/**
 * @param {string} domain
 * @param {string} sharedSecret
 * @param {string} appId
 * @constructor
 */

class Configuration {
  constructor(domain, sharedSecret, appId) {


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


}


/**
 * @type {Configuration}
 */
export default Configuration;
export {Configuration};
