export interface IFace {
  width: number;
  height: number;
  x: number;
  y: number;
}

export class Face implements IFace {
  public width: number;
  public height: number;
  public x: number;
  public y: number;

  constructor(data?: IFace) {
    if (data) {
      this.deserialize(data);
    }
  }

  /**
   * @param data
   * @private
   */
  deserialize(data: IFace) {
    this.width = data.width;
    this.height = data.height;
    this.x = data.x;
    this.y = data.y;
  }
}
