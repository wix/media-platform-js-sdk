var validator = require('../validation/validator');

/**
 * @param operation
 * @constructor
 */
function Pixelate(operation) {
    
    this.operation = operation;
    
    this.settings = {
        /**
         * @type {number|null}
         */
        size: null
    };

    this.pixels = this.pixels.bind(this);
}

/**
 * @summary Applies a pixelate effect to the image.
 * @param {number?} pixels the width of pixelation squares, in pixels
 * @returns {*} the operation
 */
Pixelate.prototype.pixels = function (pixels) {

    pixels = Math.round(pixels);
    if (!validator.numberIsGreaterThan('pixelate', pixels, 0)) {
        return this.operation;
    }

    this.settings.size = pixels || null;
    return this.operation;
};

/**
 * @returns {string}
 */
Pixelate.prototype.serialize = function () {

    var out = '';

    if (this.settings.size) {
        out += 'pix_' + this.settings.size;
    }

    return out;
};

/**
 * @type {Pixelate}
 */
module.exports = Pixelate;