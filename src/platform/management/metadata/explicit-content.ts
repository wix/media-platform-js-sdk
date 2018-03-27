export interface IExplicitContent {
  likelihood: string;
  name: string;
}

export class ExplicitContent implements IExplicitContent {
  public likelihood: string;
  public name: string;

  constructor(data?: IExplicitContent) {
    if (data) {
      this.deserialize(data);
    }
  }

  /**
   * @param data
   * @private
   */
  deserialize(data: IExplicitContent) {
    this.likelihood = data.likelihood;
    this.name = data.name;
  }
}
