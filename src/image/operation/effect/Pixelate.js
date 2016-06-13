/**
 * Created by elad on 13/06/2016.
 */

/**
 * @constructor
 */
function Pixelate() {
    
    this.settings = {
        /**
         * @type {number|null}
         */
        size: null
    } 
}

/**
 * @summary Applies a pixelate effect to the image.
 * @param {number} pixels the width of pixelation squares, in pixels
 * @returns {Pixelate} the operation
 */
Pixelate.prototype.pixelate = function (pixels) {
    this.settings.size = pixels;
    return this;
};

/**
 * @summary Applies an oil paint effect to the image.
 * @returns {Pixelate} the operation
 */
Pixelate.prototype.deactivate = function () {
    this.settings.size = null;
    return this;
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

module.exports = Pixelate;