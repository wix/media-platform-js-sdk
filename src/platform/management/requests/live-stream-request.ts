import {Geo, IGeo} from '../metadata/geo';
import {Dvr, IDvr} from '../metadata/dvr';
import {deprecated} from 'core-decorators';

export interface StateNotification {
  [key: string]: any;
}

export interface ILivestreamRequest {
  protocol: string;
  maxStreamingSec: number;
  geo: IGeo;
  connectTimeout: number;
  reconnectTimeout: number;
  streamType?: string;
  dvr: IDvr;
  stateNotification?: StateNotification;
}

export class LiveStreamRequest {
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

  constructor(data: ILivestreamRequest) {
    this.deserialize(data);
  }

  /**
   * @deprecated pass data to constructor instead
   * @param protocol
   * @returns {LiveStreamRequest}
   */
  @deprecated('pass data to constructor instead')
  setProtocol(protocol: string): this {
    this.protocol = protocol;
    return this;
  }

  /**
   * @deprecated pass data to constructor instead
   * @param maxStreamingSec
   * @returns {LiveStreamRequest}
   */
  @deprecated('pass data to constructor instead')
  setMaxStreamingSec(maxStreamingSec: number): this {
    this.maxStreamingSec = maxStreamingSec;
    return this;
  }

  /**
   * @deprecated pass data to constructor instead
   * @param geo
   * @returns {LiveStreamRequest}
   */
  @deprecated('pass data to constructor instead')
  setGeo(geo: Geo | IGeo): this {
    if (geo instanceof Geo) {
      this.geo = geo;
    } else {
      this.geo = new Geo(geo);
    }
    return this;
  }

  /**
   * @deprecated pass data to constructor instead
   * @param connectTimeout
   * @returns {LiveStreamRequest}
   */
  @deprecated('pass data to constructor instead')
  setConnectTimeout(connectTimeout: number): this {
    this.connectTimeout = connectTimeout;
    return this;
  }

  /**
   * @deprecated pass data to constructor instead
   * @param reconnectTimeout
   * @returns {LiveStreamRequest}
   */
  setReconnectTimeout(reconnectTimeout: number): this {
    this.reconnectTimeout = reconnectTimeout;
    return this;
  }

  /**
   * @deprecated pass data to constructor instead
   * @param enforcedWidth
   * @returns {LiveStreamRequest}
   */
  @deprecated('pass data to constructor instead')
  setEnforcedWidth(enforcedWidth: number): this {
    this.enforcedWidth = enforcedWidth;
    return this;
  }

  /**
   * @deprecated pass data to constructor instead
   * @param enforcedHeight
   * @returns {LiveStreamRequest}
   */
  @deprecated('pass data to constructor instead')
  setEnforcedHeight(enforcedHeight: number): this {
    this.enforcedHeight = enforcedHeight;
    return this;
  }

  /**
   * @deprecated pass data to constructor instead
   * @param streamType
   * @returns {LiveStreamRequest}
   */
  @deprecated('pass data to constructor instead')
  setStreamType(streamType: string): this {
    this.streamType = streamType;
    return this;
  }

  /**
   * @deprecated pass data to constructor instead
   * @param dvr
   * @returns {LiveStreamRequest}
   */
  @deprecated('pass data to constructor instead')
  setDvr(dvr: Dvr | IDvr): this {
    if (dvr instanceof Dvr) {
      this.dvr = dvr;
    } else {
      this.dvr = new Dvr(dvr);
    }

    return this;
  }

  /**
   * @deprecated pass data to constructor instead
   * @param stateNotification
   * @returns {LiveStreamRequest}
   */
  @deprecated('pass data to constructor instead')
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
    this.streamType = data.streamType || null;
    this.dvr = new Dvr(data.dvr);
    this.stateNotification = data.stateNotification || null;
  }
}

