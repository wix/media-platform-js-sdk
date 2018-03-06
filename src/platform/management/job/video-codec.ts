export interface IVideoCodec {
  profile: string;
  maxRate: number;
  crf: number;
  name: string;
  level: string;
}
export class VideoCodec {
  public profile: string | null = null;
  public maxRate: number | null = null;
  public crf: number | null = null;
  public name: string | null = null;
  public level: string | null = null;

  constructor(data?: IVideoCodec) {
    if (data) {
      this.deserialize(data);
    }
  }

  /**
   * @param data
   * @private
   */
  deserialize(data: IVideoCodec) {
    this.profile = data.profile;
    this.maxRate = data.maxRate;
    this.crf = data.crf;
    this.name = data.name;
    this.level = data.level;
  }
}

