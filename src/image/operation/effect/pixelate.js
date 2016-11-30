var validator = require('../validation/validator');

/**
 * @param operation
 * @constructor
 */
function Pixelate(operation) {
    
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
 * @param {number?} pixels the width of pixelation squares, in pixels
 * @returns {*} the operation
 */
Pixelate.prototype.pixels = function (pixels) {

    pixels = Math.round(pixels || 0);
    this.error = validator.numberIsNotGreaterThan('pixelate', pixels, 0);
    if (this.error) {
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

    return {
        params: out,
        error: this.error
    };
};

/**
 * @type {Pixelate}
 */
module.exports = Pixelate;