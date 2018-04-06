import {Geo, IGeo} from '../metadata/geo';
import {Dvr, IDvr} from '../metadata/dvr';

export interface StateNotification {
  [key: string]: any;
}

export interface ILivestreamRequest {
  protocol: string;
  maxStreamingSec: number;
  geo: IGeo;
  connectTimeout: number;
  reconnectTimeout: number;
  streamType: string;
  dvr: IDvr;
  stateNotification: StateNotification;
}

export class LivestreamRequest {
  public protocol: string | null = null;
  public maxStreamingSec: number | null = null;
  public geo: Geo | null = null;
  public connectTimeout: number | null = null;
  public reconnectTimeout: number | null = null;
  public streamType: string | null = null;
  public dvr: Dvr | null = null;
  public stateNotification: StateNotification | null = null;
  public enforcedWidth: number | null = null;
  public enforcedHeight: number | null = null;

  constructor(data?: ILivestreamRequest) {
    if (data) {
      this.deserialize(data);
    }
  }

  /**
   *
   * @param protocol
   * @returns {LivestreamRequest}
   */
  setProtocol(protocol: string): this {
    this.protocol = protocol;
    return this;
  }

  /**
   *
   * @param maxStreamingSec
   * @returns {LivestreamRequest}
   */
  setMaxStreamingSec(maxStreamingSec: number): this {
    this.maxStreamingSec = maxStreamingSec;
    return this;
  }

  /**
   *
   * @param geo
   * @returns {LivestreamRequest}
   */
  setGeo(geo: Geo | IGeo): this {
    if (geo instanceof Geo) {
      this.geo = geo;
    } else {
      this.geo = new Geo(geo);
    }
    return this;
  }

  /**
   *
   * @param connectTimeout
   * @returns {LivestreamRequest}
   */
  setConnectTimeout(connectTimeout: number): this {
    this.connectTimeout = connectTimeout;
    return this;
  }

  /**
   *
   * @param reconnectTimeout
   * @returns {LivestreamRequest}
   */
  setReconnectTimeout(reconnectTimeout: number): this {
    this.reconnectTimeout = reconnectTimeout;
    return this;
  }

  /**
   *
   * @param enforcedWidth
   * @returns {LivestreamRequest}
   */
  setEnforcedWidth(enforcedWidth: number): this {
    this.enforcedWidth = enforcedWidth;
    return this;
  }

  /**
   *
   * @param enforcedHeight
   * @returns {LivestreamRequest}
   */
  setEnforcedHeight(enforcedHeight: number): this {
    this.enforcedHeight = enforcedHeight;
    return this;
  }

  /**
   *
   * @param streamType
   * @returns {LivestreamRequest}
   */
  setStreamType(streamType: string): this {
    this.streamType = streamType;
    return this;
  }

  /**
   *
   * @param dvr
   * @returns {LivestreamRequest}
   */
  setDvr(dvr: Dvr | IDvr): this {
    if (dvr instanceof Dvr) {
      this.dvr = dvr;
    } else {
      this.dvr = new Dvr(dvr);
    }

    return this;
  }

  /**
   *
   * @param stateNotification
   * @returns {LivestreamRequest}
   */
  setStateNotification(stateNotification: StateNotification) {
    this.stateNotification = stateNotification;
    return this;
  }

  /**
   * @param data
   * @private
   */
  deserialize(data: ILivestreamRequest) {
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

