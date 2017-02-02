var validator = require('../validation/validator');

/**
 * @param image
 * @constructor
 */
function Hue(image) {

    this.image = image;

    /**
     * @type {string|null}
     */
    this.error = null;
    
    this.settings = {
        /**
         * @type {number|null}
         */
        hue: null
    };

    this.hue = this.hue.bind(this);
}

/**
 * @summary hue of the image.
 * @description supports a numeric value between `-100` and `100`
 * @param {number?} hue a number between `-100` and `100`
 * @returns {*} the operation
 */
Hue.prototype.hue = function (hue) {

    this.error = validator.numberNotInRange('hue', hue, -100, 100);
    if (this.error) {
        return this.image;
    }

    this.settings.hue = hue === void 0 ? null : hue;
    return this.image;
};

/**
 * @returns {string}
 */
Hue.prototype.serialize = function () {

    var out = '';

    if (this.settings.hue) {
        out += 'hue_' + this.settings.hue;
    }

    return {
        params: out,
        error: this.error
    };
};

/**
 * @type {Hue}
 */
module.exports = Hue;