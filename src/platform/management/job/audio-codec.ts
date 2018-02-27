export interface IAudioCodec {
  cbr: number;
  name: string;
}

export class AudioCodec {
  public cbr: number | null = null;
  public name: string | null = null;

  constructor(data?: IAudioCodec) {
    if (data) {
      this.deserialize(data);
    }
  }

  /**
   * @param data
   * @private
   */
  deserialize(data: IAudioCodec) {
    this.cbr = data.cbr;
    this.name = data.name;
  }
}
