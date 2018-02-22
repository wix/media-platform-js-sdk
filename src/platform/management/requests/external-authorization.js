/**
 * @constructor
 */

class ExternalAuthorization {
  constructor() {
    /**
     * @type {{}}
     */
    this.headers = {};
  }

  /**
   * @param {string} name
   * @param {string} value
   * @returns {ExternalAuthorization}
   */
  addHeader(name, value) {
    this.headers[name] = value;
    return this;
  }

  /**
   * @param {{}} headers
   * @returns {ExternalAuthorization}
   */
  setHeaders(headers) {
    this.headers = headers;
    return this;
  }
}

/**
 * @type {ExternalAuthorization}
 */
export default ExternalAuthorization;
export {ExternalAuthorization};
