var _ = require('underscore');

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
 * @returns {Brightness} the operation
 */
Brightness.prototype.brightness = function (brightness) {
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

module.exports = Brightness;