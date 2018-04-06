import {validator} from '../validation/validator';
import {Image} from '../image';
import {autobind} from 'core-decorators';

export interface ContrastSettings {
  contrast: number | null;
}

/**
 * @param image
 * @constructor
 */

class Contrast {
  public error: string | null = null;
  public settings: ContrastSettings = {
    contrast: null
  };

  constructor(public image: Image) {
  }

  /**
   * @summary contrast of the image.
   * @description supports a numeric value between `-100` and `100`
   * @param {string|number} contrast a number between `-100` and `100`
   * @returns {*} the operation
   */
  @autobind
  contrast(contrast?: string | number): Image {
    this.error = validator.numberNotInRange('contrast', contrast, -100, 100);
    if (this.error) {
      return this.image;
    }

    if (typeof contrast === 'string') {
      const numberContrast = Number(contrast);
      contrast = isNaN(numberContrast) ? undefined : numberContrast;
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
