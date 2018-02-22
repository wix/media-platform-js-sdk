import {validator} from '../validation/validator';

/**
 * @description Uses only part of the image that fills the given dimensions. Only part of the original image might be visible if the required proportions are different than the original ones.
 * @param width
 * @param height
 * @constructor Fit
 */

class Fit {
  constructor(width, height) {
    this.name = 'fit';

    /**
     * @type {number}
     */
    this.width = Math.round(width);

    /**
     * @type {number}
     */
    this.height = Math.round(height);

    this.coordinates(width, height);
  }

  /**
   * @param {number?} x the x value
   * @param {number?} y the y value
   * @returns {Fit}
   */
  coordinates(x, y) {
    if (arguments.length === 0) {
      this.x = null;
      this.y = null;
      this.error = null;
      return this;
    }

    this.x = Math.round(x);
    this.y = Math.round(y);
    return this;
  }

  /**
   * @summary The width constraint
   * @param {number} width a number greater than `0`
   * @param {number} height a number greater than `0`
   * @returns {*} the operation
   */
  size(width, height) {
    this.width = Math.round(width);
    this.height = Math.round(height);
    return this;
  }

  /**
   * @returns {{params: string || null, error: *}}
   */
  serialize() {
    var badWidth = validator.numberIsNotGreaterThan('width', this.width, 1);
    var badHeight = validator.numberIsNotGreaterThan('height', this.height, 1);

    if (badWidth || badHeight) {
      return {
        params: null,
        error: new Error([badWidth, badHeight].filter(msg => msg).join(','))
      };
    }

    var out = this.name + '/' + 'w_' + this.width + ',h_' + this.height;

    return {
      params: out,
      error: null
    };
  }
}

/**
 * @type {Fit}
 */
export default Fit;
export {Fit};
