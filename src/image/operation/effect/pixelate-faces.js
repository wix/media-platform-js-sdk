var validator = require('../validation/validator');

/**
 * @param operation
 * @constructor
 */
function PixelateFaces(operation) {

    this.operation = operation;

    /**
     * @type {string|null}
     */
    this.error = null;

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
    this.error = validator.numberIsNotGreaterThan('pixelateFaces', pixels, 0);
    if (this.error) {
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

    return {
        params: out,
        error: this.error
    };
};

/**
 * @type {PixelateFaces}
 */
module.exports = PixelateFaces;