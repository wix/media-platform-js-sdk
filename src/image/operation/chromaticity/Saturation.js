var _ = require('underscore');

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
 * @returns {Saturation} the operation
 */
Saturation.prototype.saturation = function (saturation) {
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

module.exports = Saturation;