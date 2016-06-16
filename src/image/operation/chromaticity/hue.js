var _ = require('underscore');

var validator = require('../validation/validator');

/**
 * @param operation
 * @constructor
 */
function Hue(operation) {

    this.operation = operation;

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

    if (!validator.numberInRange('hue', hue, -100, 100)) {
        return this.operation;
    }
    
    this.settings.hue = _.isUndefined(hue) ? null : hue;
    return this.operation;
};

/**
 * @returns {string}
 */
Hue.prototype.serialize = function () {

    var out = '';

    if (this.settings.hue) {
        out += 'hue_' + this.settings.hue;
    }

    return out;
};

/**
 * @type {Hue}
 */
module.exports = Hue;