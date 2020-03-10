import { validator } from './validation/validator';
import { Image } from './image';
import { autobind } from 'core-decorators';

enum Gravity {
  CENTER = 'center',
  NORTH = 'north',
  NORTH_WEST = 'north-west',
  WEST = 'west',
  SOUTH_WEST = 'south-west',
  SOUTH = 'south',
  SOUTH_EAST = 'south-east',
  EAST = 'east',
  NORTH_EAST = 'north-east',
}

interface WatermarkParams {
  path?: string;
  opacity?: number;
  proportions?: number;
  gravity?: Gravity;
}

/**
 * @param image
 * @constructor
 */

class Watermark {
  public path?: string;

  public opacity?: number;

  public proportions?: number;

  public gravity?: Gravity;

  constructor(watermarkParams?: WatermarkParams) {
    if (typeof watermarkParams !== 'undefined') {
      const { path, opacity, proportions, gravity } = watermarkParams;

      this.gravity = gravity;
      this.proportions = proportions;
      this.opacity = opacity;
      this.path = path;
    }
  }

  toClaims(): { wmk: WatermarkParams } {
    return {
      wmk: {
        path: this.path,
        opacity: this.opacity,
        proportions: this.proportions,
        gravity: this.gravity,
      },
    };
  }
}

/**
 * @type {Watermark, Gravity}
 */
export { Watermark, Gravity };
