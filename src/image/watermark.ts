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

/**
 * @param image
 * @constructor
 */

class Watermark {
  constructor(
    public path?: string,
    public opacity?: number,
    public proportions?: number,
    public gravity?: Gravity,
  ) {}

  toClaims(): any {
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
