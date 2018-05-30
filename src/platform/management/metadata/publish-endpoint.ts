import {Geo, IGeo} from './geo';
import {deprecated} from 'core-decorators';

export interface IPublishEndpoint {
  url: string;
  protocol: string;
  geo: IGeo;
}

export class PublishEndpoint {
  public url: string | null = null;
  public protocol: string | null = null;
  public geo: Geo | undefined = undefined;

  constructor(data: IPublishEndpoint) {
    this.deserialize(data);
  }

  /**
   * @param data
   * @private
   */
  deserialize(data: IPublishEndpoint) {
    this.url = data.url;
    this.protocol = data.protocol;
    this.geo = data.geo ? new Geo(data.geo) : undefined;
  }

  /**
   * @deprecated pass data to constructor instead
   * @param url
   * @returns {PublishEndpoint}
   */
  @deprecated('pass data to constructor instead')
  setUrl(url: string): this {
    this.url = url;
    return this;
  }

  /**
   * @deprecated pass data to constructor instead
   * @param protocol
   * @returns {PublishEndpoint}
   */
  @deprecated('pass data to constructor instead')
  setProtocol(protocol: string): this {
    this.protocol = protocol;
    return this;
  }

  /**
   * @deprecated pass data to constructor instead
   * @param geo
   * @returns {PublishEndpoint}
   */
  @deprecated('pass data to constructor instead')
  setGeo(geo: Geo): this {
    this.geo = geo;
    return this;
  }
}

