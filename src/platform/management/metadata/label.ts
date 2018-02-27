export interface ILabel {
  name: string;
  score: number;
}

export class Label {
  public name: string | null = null;
  public score: number | null = null;

  constructor(data?: ILabel) {
    if (data) {
      this.deserialize(data);
    }
  }

  /**
   * @param data
   * @private
   */
  deserialize(data: ILabel) {
    this.name = data.name;
    this.score = data.score;
  }
}
