/**
 * @param operation
 * @constructor
 */
function JPEG(operation) {
    
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
 * @param {number} [quality=75] a number from `1` to `100`
 * @param {boolean?} baseline 
 * @returns {JPEG} the operation
 */
JPEG.prototype.compression = function (quality, baseline) {
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

/**
 * @type {JPEG}
 */
module.exports = JPEG;