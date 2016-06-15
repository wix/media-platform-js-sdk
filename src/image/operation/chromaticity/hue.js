var _ = require('underscore');

/**
 * @param operation
 * @constructor
 */
function Hue(operation) {

    this.operation = operation;

    this.settings = {
        hue: null
    };

    this.hue = this.hue.bind(this);
}

/**
 * @summary hue of the image.
 * @description supports a numeric value between `-100` and `100`
 * @param {number?} hue a number between `-100` and `100`
 * @returns {Hue} the operation
 */
Hue.prototype.hue = function (hue) {
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