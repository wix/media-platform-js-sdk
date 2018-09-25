export interface IQualityRange {
  minimum: string | null;
  maximum: string | null;
}

export class QualityRange {
  public minimum: string | null = null;
  public maximum: string | null = null;

  constructor(data: IQualityRange) {
    this.minimum = data.minimum || null;
    this.maximum = data.maximum || null;
  }
}
