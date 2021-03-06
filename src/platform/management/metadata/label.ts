export interface ILabel {
  name: string;
  score: number;
}

export class Label implements ILabel {
  public name: string;
  public score: number;

  constructor(data: ILabel) {
    this.name = data.name;
    this.score = data.score;
  }
}
