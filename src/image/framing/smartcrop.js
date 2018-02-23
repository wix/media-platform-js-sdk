import {validator} from '../validation/validator';

/**
 * @description Crops the image intelligently using width and height options.
 * @param width
 * @param height
 * @constructor SmartCrop
 */

class SmartCrop {
  constructor(width, height) {
    this.name = 'scrop';

    /**
     * @type {number}
     */
    this.width = Math.round(width);

    /**
     * @type {number}
     */
    this.height = Math.round(height);
  }

  /**
   * @returns {{params: string, error: *}}
   */
  serialize() {
    const badWidth = validator.numberIsNotGreaterThan('width', this.width, 1);
    const badHeight = validator.numberIsNotGreaterThan('height', this.height, 1);

    if (badWidth || badHeight) {
      return {
        params: null,
        error: new Error([badWidth, badHeight].filter(msg => msg).join(','))
      };
    }

    const out = this.name + '/' + 'w_' + this.width + ',h_' + this.height;

    return {
      params: out,
      error: null
    };
  }
}

/**
 * @type {SmartCrop}
 */
export default SmartCrop;
export {SmartCrop};
