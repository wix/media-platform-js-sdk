import {autobind} from 'core-decorators';

import {Image} from '../image';
import {validator} from '../validation/validator';


export interface SaturationSettings {
  saturation: number | null;
}

class Saturation {
  public error: string | null = null;
  public settings: SaturationSettings = {
    saturation: null
  };

  constructor(public image: Image) {
  }

  /**
   * @summary saturation of the image.
   * @param {number?} saturation a Number between `-100` and `100`
   * @returns {*} the operation
   */
  @autobind
  saturation(saturation?: number): Image {
    this.error = validator.numberNotInRange('saturation', saturation, -100, 100);
    if (this.error) {
      return this.image;
    }

    this.settings.saturation = saturation === void 0 ? null : saturation;
    return this.image;
  }

  /**
   * @returns {string}
   */
  serialize() {
    let out = '';

    if (this.settings.saturation) {
      out += 'sat_' + this.settings.saturation;
    }

    return {
      params: out,
      error: this.error
    };
  }
}

/**
 * @type {Saturation}
 */
export {Saturation};
