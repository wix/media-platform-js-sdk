var validator = require('../validation/validator');

/**
 * @param operation
 * @constructor
 */
function Size(operation) {
    
    this.operation = operation;
    
    this.settings = {
        /**
         * @type {number|null}
         */
        width: null,
        /**
         * @type {number|null}
         */
        height: null
    };
    
    this.size = this.size.bind(this);
}

/**
 * @summary The width constraint
 * @param {number} width a number greater than `0`
 * @param {number} height a number greater than `0`
 * @returns {*} the operation
 */
Size.prototype.size = function (width, height) {

    width = Math.round(width);
    if (!validator.numberIsGreaterThan('width', width, 1)) {
        return this.operation;
    }

    height = Math.round(height);
    if (!validator.numberIsGreaterThan('height', height, 1)) {
        return this.operation;
    }

    this.settings.width = width;
    this.settings.height = height;
    return this.operation;
};

/**
 * @returns {string}
 */
Size.prototype.serialize = function () {

    if (!this.settings.width || !this.settings.height) {
        console.error('size: width and height are mandatory');
        return '';
    }

    return 'w_' + this.settings.width + ',h_' + this.settings.height;
};

/**
 * @type {Size}
 */
module.exports = Size;
