import { autobind } from 'core-decorators';

import { Image } from '../image';
import { validator } from '../validation/validator';

export interface BlurSettings {
  percentage: number | null;
}

/**
 * @param image
 * @constructor
 */

class Blur {
  public error: string | null = null;
  public settings: BlurSettings = {
    percentage: null,
  };

  constructor(public image: Image) {}

  /**
   * @summary Applies a blur effect to the image.
   * @param percentage percent to blur the image. Valid values: [0:100].
   * @returns {*} the operation
   */
  @autobind
  percentage(percentage?: number): Image {
    this.error = validator.numberNotInRange('blur', percentage, 0, 100);
    if (this.error) {
      return this.image;
    }

    this.settings.percentage = percentage || null;
    return this.image;
  }

  /**
   * @returns {string}
   */
  serialize() {
    let out = '';

    if (this.settings.percentage) {
      out += `blur_${this.settings.percentage}`;
    }

    return {
      params: out,
      error: this.error,
    };
  }
}

/**
 * @type {Blur}
 */
export { Blur };
