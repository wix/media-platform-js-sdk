export interface IAudioStream {
  codecLongName: string | null;
  codecTag: string | null;
  codecName: string | null;
  duration: number | null;
  bitrate: number | null;
  index: number | null;
}

export class AudioStream implements IAudioStream {
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

