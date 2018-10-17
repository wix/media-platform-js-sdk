import {Dvr, IDvr} from './dvr';
import {Geo, IGeo} from './geo';
import {IPlaybackUrl, PlaybackUrl} from './playback-url';
import {IPublishEndpoint, PublishEndpoint} from './publish-endpoint';


export interface ILiveStream {
  id: string;
  publishEndpoint: IPublishEndpoint;
  playbackUrls: IPlaybackUrl[];
  streamType: string;
  duration: number;
  connectTimeout: number;
  reconnectTimeout: number;
  enforcedWidth: number;
  enforcedHeight: number;
  maxPublishDuration: number;
  state: string;
  dvr: IDvr;
  publisherGeo: IGeo;
  dateCreated: string;
  dateUpdated: string;
}

export class LiveStream {
  public id: string | null = null;
  public publishEndpoint: PublishEndpoint | undefined;
  public playbackUrls: PlaybackUrl[] | undefined;
  public streamType: string | undefined;
  public duration: number | undefined;
  public connectTimeout: number | undefined;
  public reconnectTimeout: number | undefined;
  public enforcedWidth: number | undefined;
  public enforcedHeight: number | undefined;
  public maxPublishDuration: number | undefined;
  public publisherGeo: Geo | undefined;
  public state: string | undefined;
  public dvr: Dvr | undefined;
  public dateCreated: string | undefined;
  public dateUpdated: string | undefined;

  constructor(data: ILiveStream) {
    this.id = data.id;

    this.publishEndpoint = new PublishEndpoint(data.publishEndpoint);

    this.playbackUrls = data.playbackUrls.map(
      (playbackUrl: IPlaybackUrl) => new PlaybackUrl(playbackUrl)
    );

    this.streamType = data.streamType;
    this.duration = data.duration;
    this.connectTimeout = data.connectTimeout;
    this.reconnectTimeout = data.reconnectTimeout;
    this.enforcedWidth = data.enforcedWidth;
    this.enforcedHeight = data.enforcedHeight;
    this.maxPublishDuration = data.maxPublishDuration;
    this.state = data.state;
    this.dvr = data.dvr ? new Dvr(data.dvr) : undefined;
    this.publisherGeo = data.publisherGeo ? new Geo(data.publisherGeo) : undefined;
    this.dateCreated = data.dateCreated;
    this.dateUpdated = data.dateUpdated;
  }
}
