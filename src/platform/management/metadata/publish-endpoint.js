import {Geo} from './geo';

/**
 * @param data
 * @constructor
 */
function PublishEndpoint(data) {
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
PublishEndpoint.prototype.deserialize = function (data) {
  this.url = data.url;
  this.protocol = data.protocol;
  this.geo = new Geo(data.geo);
};


/**
 *
 * @param url {String}
 * @returns {PublishEndpoint}
 */
PublishEndpoint.prototype.setUrl = function (url) {
  this.url = url;
  return this;
};

/**
 *
 * @param protocol {String}
 * @returns {PublishEndpoint}
 */
PublishEndpoint.prototype.setProtocol = function (protocol) {
  this.protocol = protocol;
  return this;
};

/**
 *
 * @param geo {Geo}
 * @returns {PublishEndpoint}
 */
PublishEndpoint.prototype.setGeo = function (geo) {
  this.geo = geo;
  return this;
};

/**
 * @type {PublishEndpoint}
 */
export default PublishEndpoint;
export {PublishEndpoint};
