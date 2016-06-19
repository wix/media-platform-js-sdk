var Canvas = require('./operation/canvas');
var Crop = require('./operation/crop');
var Fill = require('./operation/fill');
var Fit = require('./operation/fit');
// var imageUrlParser = require('./parser/ImageURLParser');

/**
 * TODO: global operations to upper scope
 * TODO: operation chaining and transformation arithmetic
 */

/**
 * @summary a Image is a configurable object that supports all the operations, filters and adjustments supported by Wix Media Platform
 * @param {string} baseUrl the base URL where the image is hosted
 * @param {string} imageId the id of the image to manipulate
 * @param {string} imageName the name of the image to manipulate
 * @constructor Image
 */
function Image(baseUrl, imageId, imageName) {
    /**
     * @type {string}
     */
    this.baseUrl = baseUrl.trim();

    /**
     * @type {string}
     */
    this.imageId = imageId.trim();

    /**
     * @type {string}
     */
    this.imageName = imageName.trim();

    /**
     * @type {string}
     */
    this.version = 'v1';
}

/**
 * @summary Configures this image using the 'canvas' operation.
 * @returns {Canvas}
 * @method
 */
Image.prototype.canvas = function () {
    return new Canvas(this.baseUrl, this.imageId, this.imageName, this.version);
};
/**
 * @summary Configures this image using the 'fill' operation.
 * @returns {Fill}
 * @method
 */
Image.prototype.fill = function () {
    return new Fill(this.baseUrl, this.imageId, this.imageName, this.version);
};
/**
 * @summary Configures this image using the 'fit' operation.
 * @returns {Fit}
 * @method
 */
Image.prototype.fit = function () {
    return new Fit(this.baseUrl, this.imageId, this.imageName, this.version);
};
/**
 * @summary Configures this image using the 'crop' operation.
 * @returns {Crop}
 * @method
 */
Image.prototype.crop = function () {
    return new Crop(this.baseUrl, this.imageId, this.imageName, this.version);
};

/**
 * @type {Image}
 */
module.exports = Image;