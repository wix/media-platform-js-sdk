/**
 * Created by elad on 06/06/2016.
 */

var _ = require('underscore');

/**
 * @param {string} name
 * @param {{}?}transformations
 * @constructor
 */
function BaseOperation(name, transformations) {
    /**
     * @type {string}
     */
    this.name = name;

    this.transformations = {};

    if (!_.isUndefined(transformations)) {
        _.extendOwn(this.transformations, transformations);
    }
}

/**
 * @summary brightness of the image
 * @description supports `auto` or a numeric value between `-100` and `100`
 * @param {string|number} b a Number between `-100` and `100` or 'auto'
 * @returns {BaseOperation} the operation
 */
BaseOperation.prototype.brightness = function (b) {
    this.transformations.br = _.isUndefined(b) ? null : b;
    return this;
};

/**
 * @summary An alias for `brightness`
 * @name br
 * @function
 * @returns {BaseOperation} the operation
 */
BaseOperation.prototype.br = BaseOperation.prototype.brightness;

/**
 * @summary contrast of the image.
 * @description supports `auto` or a numeric value between `-100` and `100`
 * @param {string|number} c a Number between `-100` and `100` or `auto`
 * @returns {BaseOperation} the operation
 */
BaseOperation.prototype.contrast = function (c) {
    this.transformations.con = _.isUndefined(c) ? null : c;
    return this;
};

/**
 * @summary An alias for `contrast`
 * @name con
 * @function
 * @returns {BaseOperation} the operation
 */
BaseOperation.prototype.con = BaseOperation.prototype.contrast;

/**
 * @summary saturation of the image.
 * @description supports `auto` or a numeric value between `-100` and `100`
 * @param {string|number} s a Number between `-100` and `100` or `auto`
 * @returns {BaseOperation} the operation
 */
BaseOperation.prototype.saturation = function (s) {
    this.transformations.sat = _.isUndefined(s) ? null : s;
    return this;
};

/**
 * @summary An alias for `saturation`
 * @name sat
 * @function
 * @returns {BaseOperation} the operation
 */
BaseOperation.prototype.sat = BaseOperation.prototype.saturation;

/**
 * @summary hue of the image.
 * @description supports `auto` or a numeric value between `-100` and `100`
 * @param {string|number} h a Number between `-100` and `100` or `auto`
 * @returns {BaseOperation} the operation
 */
BaseOperation.prototype.hue = function (h) {
    this.transformations.hue = _.isUndefined(h) ? null : h;
    return this;
};

/**
 * @summary Red eye removal
 * @param {string|number} [eye=true]
 * @returns {BaseOperation} the operation
 */
BaseOperation.prototype.eye = function (eye) {
    this.transformations.eye = _.isUndefined(eye) ? null : eye;
    return this;
};

/**
 * @summary Applies an oil paint effect to the image.
 * @param {boolean} [oil=true] enabled
 * @returns {BaseOperation} the operation
 */
BaseOperation.prototype.oil = function (oil) {
    this.transformations.oil = !!oil;
    return this;
};

/**
 * @summary Negates the colors of the image.
 * @param {boolean} [neg=true] enabled
 * @returns {BaseOperation} the operation
 */
BaseOperation.prototype.negative =  function (neg) {
    this.transformations.neg = !!neg;
    return this;
};

/**
 * @summary An alias for `negative`
 * @name neg
 * @function
 * @returns {BaseOperation} the operation
 */
BaseOperation.prototype.neg = BaseOperation.prototype.negative;

/**
 * @summary Applies a pixelate effect to the image.
 * @param {number} pixels the width of pixelation squares, in pixels
 * @returns {BaseOperation} the operation
 */
BaseOperation.prototype.pixelate = function (pixels) {
    this.transformations.pix = pixels;
    return this;
};

/**
 * @summary An alias for `pixelate`
 * @name pix
 * @function
 * @returns {BaseOperation} the operation
 */
BaseOperation.prototype.pix = BaseOperation.prototype.pixelate;

/**
 * @summary Applies a pixelate effect to the faces in the image.
 * @param {number} pixels the width of pixelation squares, in pixels
 * @returns {BaseOperation} the operation
 */
BaseOperation.prototype.pixelateFaces = function (pixels) {
    this.transformations.pixfs = pixels;
    return this;
};

/**
 * @summary An alias for `pixelateFaces`
 * @name pixfs
 * @function
 * @returns {BaseOperation} the operation
 */
BaseOperation.prototype.pixfs = BaseOperation.prototype.pixelateFaces;

/**
 * @summary Applies a blur effect to the image.
 * @param {number} blur percent to blur the image
 * @returns {BaseOperation} the operation
 */
BaseOperation.prototype.blur = function (blur) {
    this.transformations.blur = blur;
    return this;
};

/**
 * @summary Sharpens the image using radius, amount & threshold parameters
 * @param {number} radius the unsharp mask radius. default value: `0.50`
 * @param {number} amount the unsharp mask amount. default value: `0.20`
 * @param {number} threshold the unsharp mask threshold. default value: `0.00`
 * @returns {BaseOperation} the operation
 */
BaseOperation.prototype.unsharpMask = function (radius, amount, threshold) {
    this.transformations.usm = radius + "_" + amount + "_" + threshold;
    return this;
};

/**
 * @summary An alias for `unsharpMask`
 * @name us
 * @function
 * @returns {BaseOperation} the operation
 */
BaseOperation.prototype.us = BaseOperation.prototype.unsharpMask;

/**
 * @summary Sharpens the image using radius
 * @param {number} radius sharpening mask radius, `0` to `1`
 * @returns {BaseOperation} the operation
 */
BaseOperation.prototype.sharpen =  function (radius) {
    this.transformations.shrp = radius;
    return this;
};

/**
 * @summary An alias for `sharpen`
 * @name shrp
 * @function
 * @returns {BaseOperation} the operation
 */
BaseOperation.prototype.shrp = BaseOperation.prototype.sharpen;

/**
 * @summary The width constraint
 * @param {Number} w a number greater than `0`
 * @returns {BaseOperation} the operation
 */
BaseOperation.prototype.width= function (w) {
    this.transformations.w = w;
    return this;
};

/**
 * @summary An alias for `width`
 * @name w
 * @function
 * @returns {BaseOperation} the operation
 */
BaseOperation.prototype.w = BaseOperation.prototype.width;

/**
 * @summary The height constraint
 * @param {Number} h a number greater than `0`
 * @returns {BaseOperation} the operation
 */
BaseOperation.prototype.height= function (h) {
    this.transformations.h = h;
    return this;
};

/**
 * @summary An alias for `height`
 * @name h
 * @function
 * @returns {BaseOperation} the operation
 */
BaseOperation.prototype.h = BaseOperation.prototype.height;

/**
 * @summary The shorthand to set width and height
 * @param {Number} w a number greater than `0`
 * @param {Number} h a number greater than `0`
 * @param {Number?} q a number from `0` to `100`
 * @returns {BaseOperation} the operation
 */
BaseOperation.prototype.size = function (w, h, q) {
    this.width(w);
    this.height(h);
    if (!_.isUndefined(q)) {
        this.quality(q);
    }
    return this;
};

/**
 * @summary The quality constraint, if the image is a jpg
 * @param {Number} [q=75] a number from `0` to `100`
 * @returns {BaseOperation} the operation
 */
BaseOperation.prototype.quality = function (q) {
    this.transformations.q = q || 75;
    return this;
};

/**
 * @summary An alias for `quality`
 * @name q
 * @function
 * @returns {BaseOperation} the operation
 */
BaseOperation.prototype.q = BaseOperation.prototype.quality;

/**
 * @summary Applies baseline encoding on a jpg, instead of progressive encoding.
 * @param {boolean} [bl=true] enable progressive encoding
 * @returns {BaseOperation} the operation
 */
BaseOperation.prototype.baseline = function (bl) {
    this.transformations.bl = !!bl;
    return this;
};

/**
 * @summary An alias for `baseline`
 * @name bl
 * @function
 * @returns {BaseOperation} the operation
 */
BaseOperation.prototype.bl = BaseOperation.prototype.baseline;

/**
 * @returns {string}
 */
BaseOperation.prototype.serialize = function () {
    var out = '';
    for (var a in this.transformations) {
        if (this.transformations.hasOwnProperty(a)) {
            if (out.length > 0) {
                out += ",";
            }
            out += (this.transformations[a] !== null) ? (a + "_" + this.transformations[a]) : a;
        }
    }
    return out;
};

/**
 * @type {BaseOperation}
 */
module.exports = BaseOperation;