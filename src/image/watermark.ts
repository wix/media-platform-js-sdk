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
  SOUTH_EAST = 'south_east',
  EAST = 'east',
  NORTH_EAST = 'north-east',
}

/**
 * @param image
 * @constructor
 */

class Watermark {
  constructor(
    private _path: string | null,
    private _opacity: number | null,
    private _proportions: number | null,
    private _gravity: Gravity,
  ) {}

  get path(): string | null {
    return this._path;
  }

  set path(value: string | null) {
    this._path = value;
  }

  get opacity(): number | null {
    return this._opacity;
  }

  set opacity(value: number | null) {
    this._opacity = value;
  }

  get proportions(): number | null {
    return this._proportions;
  }

  set proportions(value: number | null) {
    this._proportions = value;
  }

  get gravity(): Gravity {
    return this._gravity;
  }

  set gravity(value: Gravity) {
    this._gravity = value;
  }

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
