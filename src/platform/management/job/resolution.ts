export class Resolution {
  public width: number | null = null;
  public height: number | null = null;

  constructor(data) {
    if (data) {
      this.deserialize(data);
    }
  }

  /**
   * @param data
   * @private
   */
  deserialize(data) {
    this.width = data.width;
    this.height = data.height;
  }
}
