import {validator} from '../validation/validator';

/**
 * @param image
 * @constructor
 */
function Saturation(image) {

  this.image = image;

  /**
   * @type {string|null}
   */
  this.error = null;

  this.settings = {
    /**
     * @type {number|null}
     */
    saturation: null
  };

  this.saturation = this.saturation.bind(this);
}

/**
 * @summary saturation of the image.
 * @param {number?} saturation a Number between `-100` and `100`
 * @returns {*} the operation
 */
Saturation.prototype.saturation = function (saturation) {

  this.error = validator.numberNotInRange('saturation', saturation, -100, 100);
  if (this.error) {
    return this.image;
  }

  this.settings.saturation = saturation === void 0 ? null : saturation;
  return this.image;
};

/**
 * @returns {string}
 */
Saturation.prototype.serialize = function () {

  var out = '';

  if (this.settings.saturation) {
    out += 'sat_' + this.settings.saturation;
  }

  return {
    params: out,
    error: this.error
  };
};

/**
 * @type {Saturation}
 */
export default Saturation;
export {Saturation};
