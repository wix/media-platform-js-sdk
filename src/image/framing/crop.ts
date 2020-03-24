import { validator } from '../validation/validator';
import { GeometryBase } from './geometry-base';

/**
 * @description Crops the image starting at the x, y pixel coordinates, along with the width and height options. The image is scaled according to the scale factor parameter before crop.
 * @param width
 * @param height
 * @param x
 * @param y
 * @param scale
 * @constructor Crop
 */

export class Crop implements GeometryBase {
  public name = 'crop';
  public error: string | null = null;

  constructor(
    public width: number,
    public height: number,
    public x: number | null = null,
    public y: number | null = null,
    public scale: number | null = null,
  ) {
    this.width = Math.round(this.width);
    this.height = Math.round(this.height);
    this.coordinates(x, y, scale);
  }

  /**
   * @param {number?} x the x value
   * @param {number?} y the y value
   * @param {number?} scale The Scale factor. Valid values: (0:100].
   * @returns {*} the operation
   */
  coordinates(x, y, scale) {
    if (arguments.length === 0) {
      this.x = null;
      this.y = null;
      this.scale = null;
      this.error = null;
      return this;
    }

    this.x = Math.round(x);
    this.y = Math.round(y);
    this.scale = !scale || scale === 1 ? null : scale;
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
   * @returns {{params: string | null, error: Error | null}}
   */
  serialize() {
    const badScale = validator.numberNotInRange(
      'crop scale factor',
      this.scale,
      0,
      100,
    );
    const badX = validator.numberIsNotGreaterThan('crop x', this.x, 0);
    const badY = validator.numberIsNotGreaterThan('crop y', this.y, 0);
    const badWidth = validator.numberIsNotGreaterThan('width', this.width, 1);
    const badHeight =
      validator.numberIsRequired('height', this.height) ||
      validator.numberIsNotGreaterThan('height', this.height, 1);

    if (badScale || badX || badY || badWidth || badHeight) {
      return {
        params: null,
        error: new Error(
          [badScale, badX, badY, badWidth, badHeight]
            .filter((error) => error)
            .join(','),
        ),
      };
    }

    let out = `${this.name}/w_${this.width},h_${this.height}`;

    out += `,x_${this.x || 0}`;

    if (out.length > 0) {
      out += ',';
    }

    out += `y_${this.y || 0}`;

    if (this.scale && this.scale !== 1) {
      if (out.length > 0) {
        out += ',';
      }

      let str = this.scale.toString();

      if (this.scale === Math.floor(this.scale)) {
        str = this.scale.toFixed(1);
      }

      out += `scl_${str}`;
    }

    return {
      params: out,
      error: null,
    };
  }
}
