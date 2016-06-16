var validator = require('../validation/validator');

/**
 * @param operation
 * @constructor
 */
function Size(operation) {
    
    this.operation = operation;

    /**
     * @type {string|null}
     */
    this.error = null;
    
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
    this.error = validator.numberIsNotGreaterThan('width', width, 1);
    if (this.error) {
        return this.operation;
    }

    height = Math.round(height);
    this.error = validator.numberIsNotGreaterThan('height', height, 1);
    if (this.error) {
        return this.operation;
    }

    this.settings.width = width;
    this.settings.height = height;
    return this.operation;
};

/**
 * @returns {*}
 */
Size.prototype.serialize = function () {

    if (this.error) {
        return {
            params: null,
            error: this.error
        };
    }

    if (!this.settings.width || !this.settings.height) {
        return {
            params: null,
            error: 'size: width and height are mandatory'
        };
    }

    return {
        params: 'w_' + this.settings.width + ',h_' + this.settings.height,
        error: null
    };
};

/**
 * @type {Size}
 */
module.exports = Size;
