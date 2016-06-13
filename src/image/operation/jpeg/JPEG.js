/**
 * Created by elad on 13/06/2016.
 */

function JPEG() {

    this.settings = {
        /**
         * @type {number|null}
         */
        quality: null,

        /**
         * @type {boolean|null}
         */
        baseline: null
    }

}

/**
 * @summary The quality constraint, if the image is a jpg
 * @param {number} [q=75] a number from `1` to `100`
 * @returns {JPEG} the operation
 */
JPEG.prototype.quality = function (q) {
    if (q === 75) {
        this.settings.quality = null;
    } else {
        this.settings.quality = q || null;
    }
    return this;
};

/**
 * @summary Applies baseline encoding on a jpg, instead of progressive encoding.
 * @returns {JPEG} the operation
 */
JPEG.prototype.baseline = function () {
    this.settings.baseline = true;
    return this;
};

/**
 * @summary Applies progressive encoding on a jpg.
 * @returns {JPEG} the operation
 */
JPEG.prototype.progressive = function () {
    this.settings.baseline = null;
    return this;
};

/**
 * @returns {string}
 */
JPEG.prototype.serialize = function () {

    var out = '';

    if (this.settings.quality) {
        out += 'q_' + this.settings.quality;
    }

    if (this.settings.baseline) {
        if (out.length > 0) {
            out += ',';
        }

        out += 'bl'
    }

    return out;
};

module.exports = JPEG;