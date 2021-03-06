export interface IAudioFormat {
  formatLongName: string | null;
  duration: number | null;
  bitrate: number | null;
  size: number | null;
}

export class AudioFormat implements IAudioFormat {
  public formatLongName: string | null = null;
  public duration: number | null = null;
  public bitrate: number | null = null;
  public size: number | null = null;

  constructor(data: IAudioFormat) {
    this.formatLongName = data.formatLongName;
    this.duration = data.duration;
    this.bitrate = data.bitrate;
    this.size = data.size;
  }
}
