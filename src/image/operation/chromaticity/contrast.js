var _ = require('underscore');

var validator = require('../validation/validator');

/**
 * @param operation
 * @constructor
 */
function Contrast(operation) {
    
    this.operation = operation;

    this.settings = {
        /**
         * @type {number|null}
         */
        contrast: null
    };

    this.contrast = this.contrast.bind(this);
}

/**
 * @summary contrast of the image.
 * @description supports a numeric value between `-100` and `100`
 * @param {string|number} contrast a number between `-100` and `100`
 * @returns {*} the operation
 */
Contrast.prototype.contrast = function (contrast) {

    if (!validator.numberInRange('contrast', contrast, -100, 100)) {
        return this.operation;
    }
    
    this.settings.contrast = _.isUndefined(contrast) ? null : contrast;
    return this.operation;
};

/**
 * @returns {string}
 */
Contrast.prototype.serialize = function () {

    var out = '';

    if (this.settings.contrast) {
        out += 'con_' + this.settings.contrast;
    }

    return out;
};

/**
 * @type {Contrast}
 */
module.exports = Contrast;