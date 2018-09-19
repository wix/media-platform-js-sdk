import {deprecated} from 'core-decorators';


export interface IQualityRange {
  minimum: string | null;
  maximum: string | null;
}

export class QualityRange {
  public minimum: string | null = null;
  public maximum: string | null = null;

  constructor(data: IQualityRange) {
    this.deserialize(data);
  }

  /**
   * @deprecated pass data to constructor instead
   * @param minimum
   * @returns {QualityRange}
   */
  @deprecated('pass data to constructor instead')
  public setMinimum(minimum: string): this {
    this.minimum = minimum;
    return this;
  }

  /**
   * @deprecated pass data to constructor instead
   * @param maximum
   * @returns {QualityRange}
   */
  @deprecated('pass data to constructor instead')
  public setMaximum(maximum: string): this {
    this.maximum = maximum;
    return this;
  }

  /**
   * @param data
   * @private
   */
  private deserialize(data: IQualityRange) {
    this.minimum = data.minimum || null;
    this.maximum = data.maximum || null;
  }
}
