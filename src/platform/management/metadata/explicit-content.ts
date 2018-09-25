export enum Likelihood {
  VERY_LIKELY = 'VERY_LIKELY',
  POSSIBLE = 'POSSIBLE',
  UNLIKELY = 'UNLIKELY',
  VERY_UNLIKELY = 'VERY_UNLIKELY'
}

export interface IExplicitContent {
  likelihood: Likelihood;
  name: string;
}

export class ExplicitContent implements IExplicitContent {
  public likelihood: Likelihood;
  public name: string;

  constructor(data: IExplicitContent) {
    this.likelihood = data.likelihood;
    this.name = data.name;
  }
}
