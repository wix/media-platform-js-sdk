export interface IAudioStream {
  codecLongName: string;
  codecTag: string;
  codecName: string;
  duration: number;
  bitrate: number;
  index: number;
}

export class AudioStream {
  public codecLongName: string | null = null;
  public codecTag: string | null = null;
  public codecName: string | null = null;
  public duration: number | null = null;
  public bitrate: number | null = null;
  public index: number | null = null;

  constructor(data?: IAudioStream) {
    if (data) {
      this.deserialize(data);
    }
  }

  /**
   * @param data
   * @private
   */
  deserialize(data: IAudioStream) {
    this.codecLongName = data.codecLongName;
    this.codecTag = data.codecTag;
    this.codecName = data.codecName;
    this.duration = data.duration;
    this.bitrate = data.bitrate;
    this.index = data.index;
  }
}

