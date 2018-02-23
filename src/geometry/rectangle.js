/**
 * @param {number?} width
 * @param {number?} height
 * @param {number?} x
 * @param {number?} y
 * @constructor
 */

class Rectangle {
  constructor(width, height, x, y) {
    /**
     * @type {number}
     */
    this.x = x || 0;

    /**
     * @type {number}
     */
    this.y = y || 0;

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
   * @param {number} x
   * @returns {Rectangle}
   */
  setX(x) {
    this.x = x;
    return this;
  }

  /**
   * @param {number} y
   * @returns {Rectangle}
   */
  setY(y) {
    this.y = y;
    return this;
  }

  /**
   * @param {number} width
   * @returns {Rectangle}
   */
  setWidth(width) {
    this.width = width;
    return this;
  }

  /**
   * @param {number} height
   * @returns {Rectangle}
   */
  setHeight(height) {
    this.height = height;
    return this;
  }
}

/**
 * @type {Rectangle}
 */
export default Rectangle;
export {Rectangle};