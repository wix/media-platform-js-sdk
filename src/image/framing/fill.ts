import { SerializedGeometry } from '../../types/image/geometry';
import { validator } from '../validation/validator';

import { Geometry } from './geometry-base';

/**
 * @description Uses only part of the image that fills the given dimensions. Only part of the original image might be visible if the required proportions are different than the original ones.
 * @param width
 * @param height
 * @constructor Fill
 */
export class Fill extends Geometry {
  public name = 'fill';
  public x: number | null = null;
  public y: number | null = null;
  public error: string | null = null;

  /**
   * @param {number?} x the x value
   * @param {number?} y the y value
   * @returns {Fill}
   */
  coordinates(x?: number, y?: number): this {
    if (arguments.length === 0) {
      this.x = null;
      this.y = null;
      this.error = null;
      return this;
    }

    this.x = typeof x === 'number' ? Math.round(x) : null;
    this.y = typeof y === 'number' ? Math.round(y) : null;
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
  serialize(): SerializedGeometry {
    const badWidth = validator.numberIsNotGreaterThan('width', this.width, 1);
    const badHeight = validator.numberIsNotGreaterThan(
      'height',
      this.height,
      1,
    );

    if (badWidth || badHeight) {
      return {
        params: null,
        error: new Error([badWidth, badHeight].filter((msg) => msg).join(',')),
      };
    }

    const out = `${this.name}/w_${this.width},h_${this.height}`;

    return {
      params: out,
      error: null,
    };
  }
}
