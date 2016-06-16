var _ = require('underscore');

var validator = require('../validation/validator');

/**
 * @param operation
 * @constructor
 */
function Saturation(operation) {

    this.operation = operation;
    
    this.settings = {
        saturation: null
    };

    this.saturation = this.saturation.bind(this);
}

/**
 * @summary saturation of the image.
 * @param {number?} saturation a Number between `-100` and `100`
 * @returns {*} the operation
 */
Saturation.prototype.saturation = function (saturation) {

    if (!validator.numberInRange(this.operation, 'saturation', saturation, -100, 100)) {
        return this.operation;
    }

    this.settings.saturation = _.isUndefined(saturation) ? null : saturation;
    return this.operation;
};

/**
 * @returns {string}
 */
Saturation.prototype.serialize = function () {

    var out = '';

    if (this.settings.saturation) {
        out += 'sat_' + this.settings.saturation;
    }

    return out;
};

/**
 * @type {Saturation}
 */
module.exports = Saturation;