export interface IVideoFormat {
  formatLongName: string | null;
  duration: number | null;
  bitrate: number | null;
  size: number | null;
}

export class VideoFormat implements IVideoFormat {
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
