import {IPublishEndpoint, PublishEndpoint} from './publish-endpoint';
import {IPlaybackUrl, PlaybackUrl} from './playback-url';
import {Dvr, IDvr} from './dvr';


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
  dateCreated: string;
  dateUpdated: string;
}

export class LiveStream {
  public id: string | null = null;
  public publishEndpoint: PublishEndpoint | null = null;
  public playbackUrls: PlaybackUrl[] | null = null;
  public streamType: string | null = null;
  public duration: number | null = null;
  public connectTimeout: number | null = null;
  public reconnectTimeout: number | null = null;
  public enforcedWidth: number | null = null;
  public enforcedHeight: number | null = null;
  public maxPublishDuration: number | null = null;
  public state: string | null = null;
  public dvr: Dvr | null = null;
  public dateCreated: string | null = null;
  public dateUpdated: string | null = null;

  constructor(data?: ILiveStream) {
    if (data) {
      this.deserialize(data);
    }
  }

  /**
   * @param data
   * @private
   */
  deserialize(data: ILiveStream) {
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
    this.dvr = new Dvr(data.dvr);
    this.dateCreated = data.dateCreated;
    this.dateUpdated = data.dateUpdated;
  }
}

