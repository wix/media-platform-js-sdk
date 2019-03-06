/**
 * @param {number} width
 * @param {number} height
 * @param {string} mimeType
 * @constructor
 */

export class Metadata {
  constructor(
    public width: number,
    public height: number,
    public mimeType: string,
  ) {}

  /**
   * @returns {string}
   */
  serialize(): string {
    return `w_${this.width},h_${this.height},mt_${encodeURIComponent(
      this.mimeType,
    )}`;
  }
}
