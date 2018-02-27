export interface IVideoStream {
  codecLongName: string;
  codecTag: string;
  codecName: string;
  height: number;
  width: number;
  duration: number;
  bitrate: number;
  index: number;
  rFrameRate: string;
  avgFrameRate: string;
  sampleAspectRatio: string;
  displayAspectRatio: string;
}


export class VideoStream {
  public codecLongName: string | null = null;
  public codecTag: string | null = null;
  public codecName: string | null = null;
  public height: number | null = null;
  public width: number | null = null;
  public duration: number | null = null;
  public bitrate: number | null = null;
  public index: number | null = null;
  public rFrameRate: string | null = null;
  public avgFrameRate: string | null = null;
  public sampleAspectRatio: string | null = null;
  public displayAspectRatio: string | null = null;

  constructor(data?: IVideoStream) {
    if (data) {
      this.deserialize(data);
    }
  }

  /**
   * @param data
   * @private
   */
  deserialize(data: IVideoStream) {
    this.codecLongName = data.codecLongName;
    this.codecTag = data.codecTag;
    this.codecName = data.codecName;
    this.height = data.height;
    this.width = data.width;
    this.duration = data.duration;
    this.bitrate = data.bitrate;
    this.index = data.index;
    this.rFrameRate = data.rFrameRate;
    this.avgFrameRate = data.avgFrameRate;
    this.sampleAspectRatio = data.sampleAspectRatio;
    this.displayAspectRatio = data.displayAspectRatio;
  }
}

