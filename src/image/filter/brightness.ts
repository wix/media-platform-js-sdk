import { autobind } from 'core-decorators';

import { Image } from '../image';
import { validator } from '../validation/validator';

export interface BrightnessSettings {
  brightness: number | null;
}

/**
 * @param image
 * @constructor
 */

class Brightness {
  public error: string | null = null;
  public settings: BrightnessSettings = {
    brightness: null,
  };

  constructor(public image: Image) {}

  /**
   * @summary brightness of the image
   * @description supports a numeric value between `-100` and `100`
   * @param {string|number} brightness a Number between `-100` and `100`
   * @returns {*} the operation
   */
  @autobind
  brightness(brightness?: number): Image {
    this.error = validator.numberNotInRange(
      'brightness',
      brightness,
      -100,
      100,
    );
    if (this.error) {
      return this.image;
    }

    this.settings.brightness = brightness === void 0 ? null : brightness;
    return this.image;
  }

  /**
   * @returns {string}
   */
  serialize() {
    let out = '';

    if (this.settings.brightness) {
      out += `br_${this.settings.brightness}`;
    }

    return {
      params: out,
      error: this.error,
    };
  }
}

/**
 * @type {Brightness}
 */
export { Brightness };
