export interface IVideoCodec {
  profile: string | null;
  maxRate: number | null;
  crf: number | null;
  name: string | null;
  level: string | null;
}

export class VideoCodec implements IVideoCodec {
  public profile: string | null = null;
  public maxRate: number | null = null;
  public crf: number | null = null;
  public name: string | null = null;
  public level: string | null = null;

  constructor(data: IVideoCodec) {
    this.deserialize(data);
  }

  /**
   * @param data
   * @private
   */
  private deserialize(data: IVideoCodec) {
    this.profile = data.profile;
    this.maxRate = data.maxRate;
    this.crf = data.crf;
    this.name = data.name;
    this.level = data.level;
  }
}
