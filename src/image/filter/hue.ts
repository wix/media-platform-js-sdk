import { autobind } from 'core-decorators';

import { Image } from '../image';
import { validator } from '../validation/validator';

export interface HueSettings {
  hue: number | null;
}

/**
 * @param image
 * @constructor
 */

class Hue {
  public error: string | null = null;
  public settings: HueSettings = {
    hue: null,
  };

  constructor(public image: Image) {}

  /**
   * @summary hue of the image.
   * @description supports a numeric value between `-100` and `100`
   * @param {number?} hue a number between `-100` and `100`
   * @returns {*} the operation
   */
  @autobind
  hue(hue?: number): Image {
    this.error = validator.numberNotInRange('hue', hue, -100, 100);
    if (this.error) {
      return this.image;
    }

    this.settings.hue = hue === void 0 ? null : hue;
    return this.image;
  }

  /**
   * @returns {string}
   */
  serialize() {
    let out = '';

    if (this.settings.hue) {
      out += `hue_${this.settings.hue}`;
    }

    return {
      params: out,
      error: this.error,
    };
  }
}

/**
 * @type {Hue}
 */
export { Hue };
