export interface IColor {
  r: number;
  g: number;
  b: number;
  pixelFraction: number;
  score: number;
}

export class Color {
  public r: number | null = null;
  public g: number | null = null;
  public b: number | null = null;
  public pixelFraction: number | null = null;
  public score: number | null = null;

  constructor(data?: IColor) {
    if (data) {
      this.deserialize(data);
    }
  }

  /**
   * @param data
   * @private
   */
  deserialize(data: IColor) {
    this.r = data.r;
    this.g = data.g;
    this.b = data.b;
    this.pixelFraction = data.pixelFraction;
    this.score = data.score;
  }
}
