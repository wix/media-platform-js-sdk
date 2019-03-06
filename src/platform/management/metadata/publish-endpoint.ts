import { Geo, IGeo } from './geo';

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
    this.url = data.url;
    this.protocol = data.protocol;
    this.geo = data.geo ? new Geo(data.geo) : undefined;
  }
}
