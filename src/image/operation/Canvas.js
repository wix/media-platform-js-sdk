/**
 * Created by elad on 06/06/2016.
 */
var util = require('util');
var AlignedBaseOperation = require('./AlignedBaseOperation');

/**
 * @summary Resizes the image canvas.
 * @description Fills the width and height boundaries and crops any excess image data.
 * The resulting image will match the width and height constraints without scaling the image.
 * @constructor Canvas
 * @extends AlignedBaseOperation
 */
function Canvas(transformations) {
    AlignedBaseOperation.call(this, "canvas", transformations);
}
util.inherits(Canvas, AlignedBaseOperation);

/**
 * @summary The background color, in case the canvas size is larger than the image itself.
 * @param {string} color an RGB value, of form `rrggbb`
 * @returns {Canvas} the operation
 */
Canvas.prototype.color = function (color) {
    this.transformations.c = color;
    return this;
};

/**
 * @summary An alias for `color`
 * @name c
 * @function
 * @returns {Canvas} the operation
 */
Canvas.prototype.c = Canvas.prototype.color;

/**
 * @type {Canvas}
 */
module.exports = Canvas;