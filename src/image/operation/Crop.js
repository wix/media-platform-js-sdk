/**
 * Created by elad on 06/06/2016.
 */
var util = require('util');
var BaseOperation = require('./BaseOperation');

/**
 * @summary Crops the image based on the supplied coordinates.
 * @description Starts at the `x`, `y` pixel coordinates along with the width and height parameters.
 * @constructor Crop
 * @mixes BaseOperation
 */
function Crop(transformations) {
    BaseOperation.call(this, "crop", transformations);
}
util.inherits(Crop, BaseOperation);

/**
 * @summary The `x` value of the crop
 * @param {number} x the x value
 * @returns {Crop} the operation
 */
Crop.prototype.x = function (x) {
    this.transformations.x = x;
    return this;
};

/**
 * @summary The `y` value of the crop
 * @param {number} y the y value
 * @returns {Crop} the operation
 */
Crop.prototype.y = function (y) {
    this.transformations.y = y;
    return this;
};

/**
 * @param {number} scl The Scale factor. Scale cannot be 0. Valid values: (0:100.0].
 * @returns {Crop} the operation
 */
Crop.prototype.scl = function (scl) {
    this.transformations.scl = scl;
    return this;
};

/**
 * @summary A shorthand for setting the `x` and `y` coordinates for this crop
 * @param {number} x the x value
 * @param {number} y the y value
 * @returns {Crop}
 */
Crop.prototype.coords = function (x, y) {
    this.x(x);
    this.y(y);
    return this;
};

module.exports = Crop;