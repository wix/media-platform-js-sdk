import {autobind} from 'core-decorators';

import {Image} from '../image';
import {validator} from '../validation/validator';


export interface JPEGSettings {
  quality: number | null;
  baseline: boolean | null;
}

/**
 * @param image
 * @constructor
 */

class JPEG {
  public error: string | null = null;
  public settings: JPEGSettings = {
    quality: null,
    baseline: null
  };

  constructor(public image: Image) {
  }

  /**
   * @summary The quality constraint, if the image is a jpg
   * @param {number?} quality a number from `0` to `100`
   * @param {boolean?} baseline
   * @returns {*} the operation
   */
  @autobind
  compression(quality?: number, baseline?: boolean): Image {
    quality = Math.round(quality || 0);
    this.error = validator.numberNotInRange('jpeg compression quality', quality, 0, 100);
    if (this.error) {
      return this.image;
    }

    if (quality === 75) {
      this.settings.quality = null;
    } else {
      this.settings.quality = quality || null;
    }

    this.settings.baseline = !!baseline;
    return this.image;
  }

  /**
   * @returns {string}
   */
  serialize() {
    let out = '';

    if (this.settings.quality) {
      out += 'q_' + this.settings.quality;
    }

    if (this.settings.baseline) {
      if (out.length > 0) {
        out += ',';
      }

      out += 'bl';
    }

    return {
      params: out,
      error: this.error
    };
  }
}

/**
 * @type {JPEG}
 */
export {JPEG};
