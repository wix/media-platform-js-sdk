var inherits = require('inherits');
var BaseOperation = require('./base-operation');
var validator = require('./validation/validator');

/**
 * @param baseUrl
 * @param imageId
 * @param imageName
 * @param version
 * @param width
 * @param height
 * @param x
 * @param y
 * @param scale
 * @param originalFileData
 * @summary Crops the image starting at the x, y pixel coordinates, along with the width and height options. The image is scaled according to the scale factor parameter before crop.
 * @constructor Crop
 * @extends BaseOperation
 */
function Crop(baseUrl, imageId, imageName, version, width, height, x, y, scale, originalFileData) {
    BaseOperation.call(this, 'crop', baseUrl, imageId, imageName, version, width, height, originalFileData);

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

    this.serializationOrder.unshift(this);
}
inherits(Crop, BaseOperation);


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
 * @returns {{params: string, error: *}}
 */
Crop.prototype.serialize = function () {

    var errorMessage = validator.numberNotInRange('crop scale factor', this.scaleFactor, 0, 100) ||
    validator.numberIsNotGreaterThan('crop x', this.x, 0) ||
    validator.numberIsNotGreaterThan('crop y', this.y, 0);

    if ((this.x + this.width) > (Math.round(this.metadata.width * (this.scaleFactor || 1)))) {
        errorMessage = 'crop out off width bound';
    }

    if ((this.y + this.height) > (Math.round(this.metadata.height * (this.scaleFactor || 1)))) {
        errorMessage = 'crop out off height bound';
    }

    if (errorMessage) {
        return {
            params: '',
            error: errorMessage
        }
    }

    var out = '';

    out += 'x_' + (this.x || 0);

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