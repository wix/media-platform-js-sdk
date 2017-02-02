var validator = require('../validation/validator');

/**
 * @description Crops the image starting at the x, y pixel coordinates, along with the width and height options. The image is scaled according to the scale factor parameter before crop.
 * @param width
 * @param height
 * @param x
 * @param y
 * @param scale
 * @constructor Crop
 */
function Crop(width, height, x, y, scale) {

    this.name = 'crop';

    /**
     * @type {number}
     */
    this.x = null;

    /**
     * @type {number}
     */
    this.y = null;

    /**
     * @type {number}
     */
    this.width = Math.round(width);

    /**
     * @type {number}
     */
    this.height = Math.round(height);

    /**
     * @type {number}
     */
    this.x = null;

    /**
     * @type {number}
     */
    this.y = null;
    
    /**
     * @type {number|null}
     */
    this.scaleFactor = scale || null;

    this.coordinates(x, y, scale);
}


/**
 * @param {number?} x the x value
 * @param {number?} y the y value
 * @param {number?} scaleFactor The Scale factor. Valid values: (0:100].
 * @returns {*} the operation
 */
Crop.prototype.coordinates = function (x, y, scaleFactor) {
    if (arguments.length === 0) {
        this.x = null;
        this.y = null;
        this.scaleFactor = null;
        this.error = null;
        return this;
    }

    this.x = Math.round(x);
    this.y = Math.round(y);
    this.scaleFactor = (!scaleFactor || scaleFactor == 1) ? null : scaleFactor;
    return this;
};


/**
 * @summary The width constraint
 * @param {number} width a number greater than `0`
 * @param {number} height a number greater than `0`
 * @returns {*} the operation
 */
Crop.prototype.size = function (width, height) {
    this.width = Math.round(width);
    this.height = Math.round(height);
    return this;
};

/**
 * @param {Metadata} metadata
 * @returns {{params: string, error: *}}
 */
Crop.prototype.serialize = function (metadata) {

    var errorMessage = validator.numberNotInRange('crop scale factor', this.scaleFactor, 0, 100) ||
    validator.numberIsNotGreaterThan('crop x', this.x, 0) ||
    validator.numberIsNotGreaterThan('crop y', this.y, 0);

    if (!this.width) {
        errorMessage = 'width must be a positive number';
    }

    if (!this.height) {
        errorMessage = 'height must be a positive number';
    }

    if ((this.x + this.width) > (Math.round(metadata.width * (this.scaleFactor || 1)))) {
        errorMessage = 'crop out off width bound';
    }

    if ((this.y + this.height) > (Math.round(metadata.height * (this.scaleFactor || 1)))) {
        errorMessage = 'crop out off height bound';
    }

    if (errorMessage) {
        return {
            params: '',
            error: errorMessage
        }
    }

    var out = this.name + '/' + 'w_' + this.width + ',h_' + this.height;

    out += ',x_' + (this.x || 0);

    if (out.length > 0) {
        out += ',';
    }

    out += 'y_' + (this.y || 0);

    if (this.scaleFactor && this.scaleFactor != 1) {
        if (out.length > 0) {
            out += ',';
        }

        out += 'scl_' + this.scaleFactor;
    }

    return {
        params: out,
        error: null
    };
};

/**
 * @type {Crop}
 */
module.exports = Crop;