/**
 * Created by elad on 13/06/2016.
 */

/**
 * @constructor
 */
function Blur() {
    
    this.settings = {
        /**
         * @type {number|null}
         */
        percentage: null
    } 
}

/**
 * @summary Applies a blur effect to the image.
 * @param {number} percentage percent to blur the image
 * @returns {Blur} the operation
 */
Blur.prototype.blur = function (percentage) {
    this.settings.percentage = percentage;
    return this;
};
/**
 * @summary Applies an oil paint effect to the image.
 * @returns {Blur} the operation
 */
Blur.prototype.deactivate = function () {
    this.settings.percentage = null;
    return this;
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

module.exports = Blur;