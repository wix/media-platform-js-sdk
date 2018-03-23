export interface IQualityRange {
  minimum: string | null;
  maximum: string | null;
}

export class QualityRange {
  public minimum: string | null = null;
  public maximum: string | null = null;

  constructor(data?: IQualityRange | null) {
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

