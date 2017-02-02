var validator = require('../validation/validator');

/**
 * @param image
 * @constructor
 */
function Blur(image) {
    
    this.image = image;

    /**
     * @type {string|null}
     */
    this.error = null;
    
    this.settings = {
        /**
         * @type {number|null}
         */
        percentage: null
    };

    this.percentage = this.percentage.bind(this);
}

/**
 * @summary Applies a blur effect to the image.
 * @param {number?} percentage percent to blur the image. Valid values: [0:100].
 * @returns {*} the operation
 */
Blur.prototype.percentage = function (percentage) {

    this.error = validator.numberNotInRange('blur', percentage, 0, 100);
    if (this.error) {
        return this.image;
    }

    this.settings.percentage = percentage || null;
    return this.image;
};

/**
 * @returns {string}
 */
Blur.prototype.serialize = function () {

    var out = '';

    if (this.settings.percentage) {
        out += 'blur_' + this.settings.percentage;
    }

    return {
        params: out,
        error: this.error
    };
};

/**
 * @type {Blur}
 */
module.exports = Blur;