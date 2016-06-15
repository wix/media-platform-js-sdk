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
 * @returns {PixelateFaces} the operation
 */
PixelateFaces.prototype.pixels = function (pixels) {
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