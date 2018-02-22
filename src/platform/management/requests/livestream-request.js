import {Geo} from '../metadata/geo';
import {Dvr} from '../metadata/dvr';

/**
 * @constructor
 */
function LivestreamRequest(data) {

  /**
   * @type {string}
   */
  this.protocol = null;

  /**
   *
   * @type {number}
   */
  this.maxStreamingSec = null;

  /**
   *
   * @type {Geo}
   */
  this.geo = null;

  /**
   *
   * @type {number}
   */
  this.connectTimeout = null;

  /**
   *
   * @type {number}
   */
  this.reconnectTimeout = null;


  /**
   *
   * @type {string}
   */
  this.streamType = null;

  /**
   *
   * @type {Dvr}
   */
  this.dvr = null;

  /**
   *
   * @type {Object}
   */
  this.stateNotification = null;

  if (data) {
    this.deserialize(data);
  }
}

/**
 *
 * @param protocol {String}
 * @returns {LivestreamRequest}
 */
LivestreamRequest.prototype.setProtocol = function (protocol) {
  this.protocol = protocol;
  return this;
};

/**
 *
 * @param maxStreamingSec {number}
 * @returns {LivestreamRequest}
 */
LivestreamRequest.prototype.setMaxStreamingSec = function (maxStreamingSec) {
  this.maxStreamingSec = maxStreamingSec;
  return this;
};


/**
 *
 * @param geo {Geo|{}}
 * @returns {LivestreamRequest}
 */
LivestreamRequest.prototype.setGeo = function (geo) {
  if (geo instanceof Geo) {
    this.geo = geo;
  } else {
    this.geo = new Geo(geo);
  }

  return this;
};

/**
 *
 * @param connectTimeout {number}
 * @returns {LivestreamRequest}
 */
LivestreamRequest.prototype.setConnectTimeout = function (connectTimeout) {
  this.connectTimeout = connectTimeout;
  return this;
};

/**
 *
 * @param reconnectTimeout {number}
 * @returns {LivestreamRequest}
 */
LivestreamRequest.prototype.setReconnectTimeout = function (reconnectTimeout) {
  this.reconnectTimeout = reconnectTimeout;
  return this;
};

/**
 *
 * @param enforcedWidth {number}
 * @returns {LivestreamRequest}
 */
LivestreamRequest.prototype.setEnforcedWidth = function (enforcedWidth) {
  this.enforcedWidth = enforcedWidth;
  return this;
};

/**
 *
 * @param enforcedHeight {number}
 * @returns {LivestreamRequest}
 */
LivestreamRequest.prototype.setEnforcedHeight = function (enforcedHeight) {
  this.enforcedHeight = enforcedHeight;
  return this;
};

/**
 *
 * @param streamType {String}
 * @returns {LivestreamRequest}
 */
LivestreamRequest.prototype.setStreamType = function (streamType) {
  this.streamType = streamType;
  return this;
};

/**
 *
 * @param dvr {Dvr|{}}
 * @returns {LivestreamRequest}
 */
LivestreamRequest.prototype.setDvr = function (dvr) {
  if (dvr instanceof Dvr) {
    this.dvr = dvr;
  } else {
    this.dvr = new Dvr(dvr);
  }

  return this;
};

/**
 *
 * @param stateNotification {{}}
 * @returns {LivestreamRequest}
 */
LivestreamRequest.prototype.setStateNotification = function (stateNotification) {
  this.stateNotification = stateNotification;
  return this;
};

/**
 * @param data
 * @private
 */
LivestreamRequest.prototype.deserialize = function (data) {
  this.protocol = data.protocol;
  this.maxStreamingSec = data.maxStreamingSec;
  this.geo = new Geo(data.geo);
  this.connectTimeout = data.connectTimeout;
  this.reconnectTimeout = data.reconnectTimeout;
  this.streamType = data.streamType;
  this.dvr = new Dvr(data.dvr);
  this.stateNotification = data.stateNotification;
};


/**
 * @type {LivestreamRequest}
 */
export default LivestreamRequest;
export {LivestreamRequest};
