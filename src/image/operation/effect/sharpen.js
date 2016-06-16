var validator = require('../validation/validator');

/**
 * @param operation
 * @constructor
 */
function Sharpen(operation) {
    
    this.operation = operation;

    /**
     * @type {string|null}
     */
    this.error = null;
    
    this.settings = {
        /**
         * @type {number|null}
         */
        radius: null
    };

    this.sharpen = this.sharpen.bind(this);
}

/**
 * @summary Sharpens the image using radius
 * @param {number} radius sharpening mask radius, `0` to `1`
 * @returns {*} the operation
 */
Sharpen.prototype.sharpen = function (radius) {

    this.error = validator.numberNotInRange('sharpen radius', radius, 0, 1);
    if (this.error) {
        return this.operation;
    }
    
    this.settings.radius = radius;
    return this.operation;
};

/**
 * @returns {string}
 */
Sharpen.prototype.serialize = function () {

    var out = '';

    if (this.settings.radius) {
        out += 'shrp_' + this.settings.radius;
    }

    return {
        params: out,
        error: this.error
    };
};

/**
 * @type {Sharpen}
 */
module.exports = Sharpen;