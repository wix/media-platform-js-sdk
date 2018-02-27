import {Geo, IGeo} from './geo';

export interface IPublishEndpoint {
  url: string;
  protocol: string;
  geo: IGeo;
}

export class PublishEndpoint {
  public url: string | null = null;
  public protocol: string | null = null;
  public geo: Geo | null = null;

  constructor(data?: IPublishEndpoint) {
    if (data) {
      this.deserialize(data);
    }
  }

  /**
   * @param data
   * @private
   */
  deserialize(data: IPublishEndpoint) {
    this.url = data.url;
    this.protocol = data.protocol;
    this.geo = new Geo(data.geo);
  }

  /**
   *
   * @param url
   * @returns {PublishEndpoint}
   */
  setUrl(url: string): this {
    this.url = url;
    return this;
  }

  /**
   *
   * @param protocol
   * @returns {PublishEndpoint}
   */
  setProtocol(protocol: string): this {
    this.protocol = protocol;
    return this;
  }

  /**
   *
   * @param geo
   * @returns {PublishEndpoint}
   */
  setGeo(geo: Geo): this {
    this.geo = geo;
    return this;
  }
}

