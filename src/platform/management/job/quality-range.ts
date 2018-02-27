export interface IQualityRange {
  minimum: string;
  maximum: string;
}

export class QualityRange {
  public minimum: string | null = null;
  public maximum: string | null = null;

  constructor(data?: IQualityRange) {
    if (data) {
      this.deserialize(data);
    }
  }

  /**
   * @param minimum
   * @returns {QualityRange}
   */
  setMinimum(minimum: string): this {
    this.minimum = minimum;
    return this;
  }

  /**
   * @param maximum
   * @returns {QualityRange}
   */
  setMaximum(maximum: string): this {
    this.maximum = maximum;
    return this;
  }

  /**
   * @param data
   * @private
   */
  deserialize(data: IQualityRange) {
    this.minimum = data.minimum;
    this.maximum = data.maximum;
  }
}

