import {Geo} from './geo';

/**
 * @param data
 * @constructor
 */

class PublishEndpoint {
  constructor(data) {
    /**
     *
     * @type {String}
     */
    this.url = null;

    /**
     *
     * @type {String}
     */
    this.protocol = null;

    /**
     *
     * @type {Geo}
     */
    this.geo = null;

    if (data) {
      this.deserialize(data);
    }
  }

  /**
   * @param data
   * @private
   */
  deserialize(data) {
    this.url = data.url;
    this.protocol = data.protocol;
    this.geo = new Geo(data.geo);
  }

  /**
   *
   * @param url {String}
   * @returns {PublishEndpoint}
   */
  setUrl(url) {
    this.url = url;
    return this;
  }

  /**
   *
   * @param protocol {String}
   * @returns {PublishEndpoint}
   */
  setProtocol(protocol) {
    this.protocol = protocol;
    return this;
  }

  /**
   *
   * @param geo {Geo}
   * @returns {PublishEndpoint}
   */
  setGeo(geo) {
    this.geo = geo;
    return this;
  }
}

/**
 * @type {PublishEndpoint}
 */
export default PublishEndpoint;
export {PublishEndpoint};
