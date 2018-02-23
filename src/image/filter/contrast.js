import {validator} from '../validation/validator';

/**
 * @param image
 * @constructor
 */

class Contrast {
  constructor(image) {
    this.image = image;

    /**
     * @type {string|null}
     */
    this.error = null;

    this.settings = {
      /**
       * @type {number|null}
       */
      contrast: null
    };

    this.contrast = this.contrast.bind(this);
  }

  /**
   * @summary contrast of the image.
   * @description supports a numeric value between `-100` and `100`
   * @param {string|number} contrast a number between `-100` and `100`
   * @returns {*} the operation
   */
  contrast(contrast) {
    this.error = validator.numberNotInRange('contrast', contrast, -100, 100);
    if (this.error) {
      return this.image;
    }

    this.settings.contrast = contrast === void 0 ? null : contrast;
    return this.image;
  }

  /**
   * @returns {string}
   */
  serialize() {
    let out = '';

    if (this.settings.contrast) {
      out += 'con_' + this.settings.contrast;
    }

    return {
      params: out,
      error: this.error
    };
  }
}

/**
 * @type {Contrast}
 */
export default Contrast;
export {Contrast};
