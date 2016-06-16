var validator = require('../validation/validator');

/**
 * @param operation
 * @constructor
 */
function JPEGSettings(operation) {
    
    this.operation = operation;

    this.settings = {
        /**
         * @type {number|null}
         */
        quality: null,

        /**
         * @type {boolean|null}
         */
        baseline: null
    };

    this.compression = this.compression.bind(this);
}

/**
 * @summary The quality constraint, if the image is a jpg
 * @param {number?} quality a number from `0` to `100`
 * @param {boolean?} baseline 
 * @returns {*} the operation
 */
JPEGSettings.prototype.compression = function (quality, baseline) {

    quality = Math.round(quality);

    if (!validator.numberInRange('jpeg compression quality', quality, 0, 100)) {
        return this.operation;
    }

    if (quality === 75) {
        this.settings.quality = null;
    } else {
        this.settings.quality = quality || null;
    }

    this.settings.baseline = !!baseline;
    
    return this.operation;
};

/**
 * @returns {string}
 */
JPEGSettings.prototype.serialize = function () {

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

/**
 * @type {JPEGSettings}
 */
module.exports = JPEGSettings;