/**
 * @param operation
 * @constructor
 */
function Blur(operation) {
    
    this.operation = operation;
    
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
 * @param {number?} percentage percent to blur the image
 * @returns {Blur} the operation
 */
Blur.prototype.percentage = function (percentage) {
    this.settings.percentage = percentage || null;
    return this.operation;
};

/**
 * @returns {string}
 */
Blur.prototype.serialize = function () {

    var out = '';

    if (this.settings.percentage) {
        out += 'blur_' + this.settings.percentage;
    }

    return out;
};

/**
 * @type {Blur}
 */
module.exports = Blur;