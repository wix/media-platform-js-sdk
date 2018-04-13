export interface IAudioCodec {
  cbr: number | null;
  name: string | null;
}

export class AudioCodec implements IAudioCodec {
  public cbr: number | null = null;
  public name: string | null = null;

  constructor(data: IAudioCodec) {
    this.deserialize(data);
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
