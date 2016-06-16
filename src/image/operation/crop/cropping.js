var validator = require('../validation/validator');

/**
 * @param operation
 * @constructor
 */
function Cropping(operation) {

    this.operation = operation;

    this.settings = {
        /**
         * @type {number|null}
         */
        x: null,
        /**
         * @type {number|null}
         */
        y: null,
        /**
         * @type {number|null}
         */
        scaleFactor: null
    };

    this.dimensions = this.dimensions.bind(this);
}

/**
 * @param {number?} x the x value
 * @param {number?} y the y value
 * @param {number?} scaleFactor The Scale factor. Valid values: (0:100].
 * @returns {*} the operation
 */
Cropping.prototype.dimensions = function (x, y, scaleFactor) {

    if (arguments.length === 0) {
        this.settings.x = null;
        this.settings.y = null;
        this.settings.scaleFactor = null;
        return this.operation;
    }

    if (!validator.numberInRange('crop scale factor', scaleFactor, 0, 100)) {
        return this.operation;
    }

    x = Math.round(x);
    if (!validator.numberIsGreaterThan('crop x', x, 1)) {
        return this.operation;
    }

    y = Math.round(y);
    if (!validator.numberIsGreaterThan('crop y', y, 1)) {
        return this.operation;
    }

    this.settings.x = x;
    this.settings.y = y;
    this.settings.scaleFactor = (!scaleFactor || scaleFactor == 1) ? null : scaleFactor;
    return this.operation;
};

/**
 * @returns {string}
 */
Cropping.prototype.serialize = function () {

    var out = '';

    if (this.settings.x) {
        out += 'x_' + this.settings.x;
    }

    if (this.settings.y) {
        if (out.length > 0) {
            out += ',';
        }

        out += 'y_' + this.settings.y;
    }

    if (this.settings.scaleFactor) {
        if (out.length > 0) {
            out += ',';
        }

        out += 'scl_' + this.settings.scaleFactor;
    }
    return out;
};

/**
 * @type {Cropping}
 */
module.exports = Cropping;