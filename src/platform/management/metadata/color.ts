export interface IColor {
  r: number;
  g: number;
  b: number;
  pixelFraction: number | null;
  score: number | null;
}

export class Color implements IColor {
  public r: number;
  public g: number;
  public b: number;
  public pixelFraction: number | null = null;
  public score: number | null = null;

  constructor(data: IColor) {
    this.r = data.r;
    this.g = data.g;
    this.b = data.b;
    this.pixelFraction = data.pixelFraction;
    this.score = data.score;
  }
}
