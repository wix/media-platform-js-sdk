var validator = require('../validation/validator');

/**
 * @param operation
 * @constructor
 */
function PixelateFaces(operation) {

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
 * @param {number} pixels the width of pixelation squares, in pixels
 * @returns {*} the operation
 */
PixelateFaces.prototype.pixels = function (pixels) {

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
PixelateFaces.prototype.serialize = function () {

    var out = '';

    if (this.settings.size) {
        out += 'pixfs_' + this.settings.size;
    }

    return out;
};

/**
 * @type {PixelateFaces}
 */
module.exports = PixelateFaces;