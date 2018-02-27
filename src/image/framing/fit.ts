import {validator} from '../validation/validator';
import {Geometry} from './geometry-base';
import {SerializedGeometry} from '../../types/image/geometry';

/**
 * @description Uses only part of the image that fills the given dimensions. Only part of the original image might be visible if the required proportions are different than the original ones.
 * @param width
 * @param height
 * @constructor Fit
 */

export class Fit extends Geometry {
  public name = 'fit';
  public x: number;
  public y: number;
  public error: string | null = null;

  /**
   * @param {number?} x the x value
   * @param {number?} y the y value
   * @returns {Fit}
   */
  coordinates(x, y) {
    if (arguments.length === 0) {
      this.x = null;
      this.y = null;
      this.error = null;
      return this;
    }

    this.x = Math.round(x);
    this.y = Math.round(y);
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
    const badHeight = validator.numberIsNotGreaterThan('height', this.height, 1);

    if (badWidth || badHeight) {
      return {
        params: null,
        error: new Error([badWidth, badHeight].filter(msg => msg).join(','))
      };
    }

    const out = this.name + '/' + 'w_' + this.width + ',h_' + this.height;

    return {
      params: out,
      error: null
    };
  }
}
