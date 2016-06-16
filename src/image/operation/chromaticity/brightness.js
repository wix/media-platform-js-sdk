var _ = require('underscore');

var validator = require('../validation/validator');

/**
 * @param operation
 * @constructor
 */
function Brightness(operation) {
    
    this.operation = operation;

    this.settings = {
        /**
         * @type {number|null}
         */
        brightness: null
    };

    this.brightness = this.brightness.bind(this);
}

/**
 * @summary brightness of the image
 * @description supports a numeric value between `-100` and `100`
 * @param {string|number} brightness a Number between `-100` and `100`
 * @returns {*} the operation
 */
Brightness.prototype.brightness = function (brightness) {

    if (!validator.numberInRange(this.operation, 'brightness', brightness, -100, 100)) {
        return this.operation;
    }

    this.settings.brightness = _.isUndefined(brightness) ? null : brightness;
    return this.operation;
};

/**
 * @returns {string}
 */
Brightness.prototype.serialize = function () {

    var out = '';

    if (this.settings.brightness) {
        out += 'br_' + this.settings.brightness;
    }
    
    return out;
};

/**
 * @type {Brightness}
 */
module.exports = Brightness;