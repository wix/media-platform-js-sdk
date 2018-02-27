import {VideoCodec} from './video-codec';
import {Resolution} from './resolution';

export interface IVideoSpecification {
  frameRate: string;
  keyFrame: number;
  codec: VideoCodec;
  resolution: Resolution;
}

export class VideoSpecification {
  public frameRate: string | null = null;
  public keyFrame: number | null = null;
  public codec: VideoCodec | null = null;
  public resolution: Resolution | null = null;

  constructor(data?: IVideoSpecification) {
    if (data) {
      this.deserialize(data);
    }
  }

  /**
   * @param data
   * @private
   */
  deserialize(data: IVideoSpecification) {
    this.frameRate = data.frameRate;
    this.keyFrame = data.keyFrame;
    this.codec = new VideoCodec(data.codec);
    this.resolution = new Resolution(data.resolution);
  }
}

