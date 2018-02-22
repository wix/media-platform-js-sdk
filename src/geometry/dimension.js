/**
 * @param {number?} width
 * @param {number?} height
 * @constructor
 */

class Dimension {
  constructor(width, height) {
    /**
     * @type {number|null}
     */
    this.width = width || null;

    /**
     * @type {number|null}
     */
    this.height = height || null;
  }

  /**
   * @param {number} width
   * @returns {Dimension}
   */
  setWidth(width) {
    this.width = width;
    return this;
  }

  /**
   * @param {number} height
   * @returns {Dimension}
   */
  setHeight(height) {
    this.height = height;
    return this;
  }
}

/**
 * @type {Dimension}
 */
export default Dimension;
export {Dimension};
