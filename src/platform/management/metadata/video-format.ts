export interface IVideoFormat {
  formatLongName: string;
  duration: number;
  bitrate: number;
  size: number;
}

export class VideoFormat {
  public formatLongName: string | null = null;
  public duration: number | null = null;
  public bitrate: number | null = null;
  public size: number | null = null;

  constructor(data?: IVideoFormat) {
    if (data) {
      this.deserialize(data);
    }
  }

  /**
   * @param data
   * @private
   */
  deserialize(data: IVideoFormat) {
    this.formatLongName = data.formatLongName;
    this.duration = data.duration;
    this.bitrate = data.bitrate;
    this.size = data.size;
  }
}
