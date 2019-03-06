import { autobind } from 'core-decorators';
import { validator } from '../validation/validator';
import { Image } from '../image';

export interface UnsharpMaskSettings {
  radius: number | null;
  amount: number | null;
  threshold: number | null;
}

export type UnsharpNumber = number | string | null;

/**
 * @param image
 * @constructor
 */

class UnsharpMask {
  public settings: UnsharpMaskSettings = {
    radius: null,
    amount: null,
    threshold: null,
  };
  public error: string | null = null;

  constructor(public image: Image) {}

  /**
   * @summary Sharpens the image using radius, amount & threshold parameters
   * @param radius the unsharp mask radius. default value: `0.50`
   * @param amount the unsharp mask amount. default value: `0.20`
   * @param threshold the unsharp mask threshold. default value: `0.00`
   * @returns {*} the operation
   */
  @autobind
  configuration(
    radius: UnsharpNumber = null,
    amount: UnsharpNumber = null,
    threshold: UnsharpNumber = null,
  ): Image {
    if (!radius) {
      this.settings.radius = null;
      this.settings.amount = null;
      this.settings.threshold = null;
      this.error = null;
      return this.image;
    }

    const floatify = (param: string | number | null) =>
      typeof param === 'string' ? parseFloat(param) : param;
    const r = floatify(radius);
    const a = floatify(amount);
    const t = floatify(threshold);

    this.error = validator.numberNotInRange('unsharp mask radius', r, 0.1, 128);
    if (!this.error) {
      this.error = validator.numberNotInRange('unsharp mask amount', a, 0, 10);
    }
    if (!this.error) {
      this.error = validator.numberNotInRange(
        'unsharp mask threshold',
        t,
        0,
        255,
      );
    }

    this.settings.radius = r;
    this.settings.amount = a;
    this.settings.threshold = t;
    return this.image;
  }

  /**
   * @returns {string}
   */
  serialize() {
    if (this.error) {
      return {
        params: null,
        error: this.error,
      };
    }

    let out = '';

    if (
      this.settings.radius !== null &&
      this.settings.amount !== null &&
      this.settings.threshold !== null
    ) {
      out +=
        'usm_' +
        this.settings.radius.toFixed(2) +
        '_' +
        this.settings.amount.toFixed(2) +
        '_' +
        this.settings.threshold.toFixed(2);
    }

    return {
      params: out,
      error: this.error,
    };
  }
}

export { UnsharpMask };
