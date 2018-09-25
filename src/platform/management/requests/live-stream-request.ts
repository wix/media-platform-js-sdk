import {Dvr, IDvr} from '../metadata/dvr';
import {Geo, IGeo} from '../metadata/geo';


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

  constructor(data: ILivestreamRequest) {
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
