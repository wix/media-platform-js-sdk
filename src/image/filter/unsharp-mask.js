var validator = require('../validation/validator');

/**
 * @param image
 * @constructor
 */
function UnsharpMask(image) {
    
    this.image = image;
    
    /**
     * @type {string|null}
     */
    this.error = null;
    
    this.settings = {
        /**
         * @type {number|null}
         */
        radius: null,
        /**
         * @type {number|null}
         */
        amount: null,
        /**
         * @type {number|null}
         */
        threshold: null
    };

    this.configuration = this.configuration.bind(this);
}

/**
 * @summary Sharpens the image using radius, amount & threshold parameters
 * @param {number} radius the unsharp mask radius. default value: `0.50`
 * @param {number} amount the unsharp mask amount. default value: `0.20`
 * @param {number} threshold the unsharp mask threshold. default value: `0.00`
 * @returns {*} the operation
 */
UnsharpMask.prototype.configuration = function (radius, amount, threshold) {

    if (arguments.length === 0) {
        this.settings.radius= null;
        this.settings.amount = null;
        this.settings.threshold = null;
        this.error = null;
        return this.image;
    }

    var r = parseFloat(radius);
    var a = parseFloat(amount);
    var t = parseFloat(threshold);

    this.error = validator.numberNotInRange('unsharp mask radius', r, 0.1, 128);
    if (!this.error) {
        this.error = validator.numberNotInRange('unsharp mask amount', a, 0, 10);
    }
    if (!this.error) {
        this.error = validator.numberNotInRange('unsharp mask threshold', t, 0, 255);
    }

    this.settings.radius = r;
    this.settings.amount = a;
    this.settings.threshold = t;
    return this.image;
};

/**
 * @returns {string}
 */
UnsharpMask.prototype.serialize = function () {

    if (this.error) {
        return {
            params: null,
            error: this.error
        };
    }

    var out = '';

    if (this.settings.radius != null
        && this.settings.amount != null
        && this.settings.threshold !=null) {
        out += 'usm_' +
            this.settings.radius.toFixed(2) + "_" +
            this.settings.amount.toFixed(2) + "_" +
            this.settings.threshold.toFixed(2);
    }

    return {
        params: out,
        error: this.error
    };
};

/**
 * @type {UnsharpMask}
 */
module.exports = UnsharpMask;