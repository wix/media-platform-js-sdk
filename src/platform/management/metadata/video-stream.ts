export interface IVideoStream {
  codecLongName: string | null;
  codecTag: string | null;
  codecName: string | null;
  height: number | null;
  width: number | null;
  duration: number | null;
  bitrate: number | null;
  index: number | null;
  rFrameRate: string | null;
  avgFrameRate: string | null;
  sampleAspectRatio: string | null;
  displayAspectRatio: string | null;
}


export class VideoStream implements IVideoStream {
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

