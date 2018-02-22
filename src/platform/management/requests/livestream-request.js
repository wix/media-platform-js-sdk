import {Geo} from '../metadata/geo';
import {Dvr} from '../metadata/dvr';

/**
 * @constructor
 */

class LivestreamRequest {
  constructor(data) {
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
  setProtocol(protocol) {
    this.protocol = protocol;
    return this;
  }

  /**
   *
   * @param maxStreamingSec {number}
   * @returns {LivestreamRequest}
   */
  setMaxStreamingSec(maxStreamingSec) {
    this.maxStreamingSec = maxStreamingSec;
    return this;
  }

  /**
   *
   * @param geo {Geo|{}}
   * @returns {LivestreamRequest}
   */
  setGeo(geo) {
    if (geo instanceof Geo) {
      this.geo = geo;
    } else {
      this.geo = new Geo(geo);
    }

    return this;
  }

  /**
   *
   * @param connectTimeout {number}
   * @returns {LivestreamRequest}
   */
  setConnectTimeout(connectTimeout) {
    this.connectTimeout = connectTimeout;
    return this;
  }

  /**
   *
   * @param reconnectTimeout {number}
   * @returns {LivestreamRequest}
   */
  setReconnectTimeout(reconnectTimeout) {
    this.reconnectTimeout = reconnectTimeout;
    return this;
  }

  /**
   *
   * @param enforcedWidth {number}
   * @returns {LivestreamRequest}
   */
  setEnforcedWidth(enforcedWidth) {
    this.enforcedWidth = enforcedWidth;
    return this;
  }

  /**
   *
   * @param enforcedHeight {number}
   * @returns {LivestreamRequest}
   */
  setEnforcedHeight(enforcedHeight) {
    this.enforcedHeight = enforcedHeight;
    return this;
  }

  /**
   *
   * @param streamType {String}
   * @returns {LivestreamRequest}
   */
  setStreamType(streamType) {
    this.streamType = streamType;
    return this;
  }

  /**
   *
   * @param dvr {Dvr|{}}
   * @returns {LivestreamRequest}
   */
  setDvr(dvr) {
    if (dvr instanceof Dvr) {
      this.dvr = dvr;
    } else {
      this.dvr = new Dvr(dvr);
    }

    return this;
  }

  /**
   *
   * @param stateNotification {{}}
   * @returns {LivestreamRequest}
   */
  setStateNotification(stateNotification) {
    this.stateNotification = stateNotification;
    return this;
  }

  /**
   * @param data
   * @private
   */
  deserialize(data) {
    this.protocol = data.protocol;
    this.maxStreamingSec = data.maxStreamingSec;
    this.geo = new Geo(data.geo);
    this.connectTimeout = data.connectTimeout;
    this.reconnectTimeout = data.reconnectTimeout;
    this.streamType = data.streamType;
    this.dvr = new Dvr(data.dvr);
    this.stateNotification = data.stateNotification;
  }
}

/**
 * @type {LivestreamRequest}
 */
export default LivestreamRequest;
export {LivestreamRequest};
