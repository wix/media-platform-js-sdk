var Canvas = require('./operation/canvas');
var Crop = require('./operation/crop');
var Fill = require('./operation/fill');
var Fit = require('./operation/fit');

/**
 * @summary a ImageRequest is a configurable object that supports all the operations, filters and adjustments supported by Wix Media Platform
 * @param {string} baseUrl the base URL where the image is hosted
 * @param {string} imageId the id of the image to manipulate
 * @param {string} imageName the name of the image to manipulate
 * @constructor ImageRequest
 */
function ImageRequest(baseUrl, imageId, imageName) {

    // if (!imageId) {
    //     console.error('imageId is mandatory');
    //     return;
    // }
    //
    // if (!imageName) {
    //     console.error('imageName is mandatory');
    //     return;
    // }
    
    /**
     * @type {string}
     */
    this.baseUrl = !baseUrl ? '' : baseUrl;

    /**
     * @type {string}
     */
    this.imageId = imageId;

    /**
     * @type {string}
     */
    this.imageName = imageName;

    /**
     * @type {string}
     */
    this.version = 'v1';
}

/**
 * @summary Configures this image using the 'canvas' operation.
 * @param {number} width
 * @param {number} height
 * @returns {Canvas}
 * @method
 */
ImageRequest.prototype.canvas = function (width, height) {
    return new Canvas(this.baseUrl, this.imageId, this.imageName, this.version, width, height);
};
/**
 * @summary Configures this image using the 'fill' operation.
 * @param {number} width
 * @param {number} height
 * @returns {Fill}
 * @method
 */
ImageRequest.prototype.fill = function (width, height) {
    return new Fill(this.baseUrl, this.imageId, this.imageName, this.version, width, height);
};
/**
 * @summary Configures this image using the 'fit' operation.
 * @param {number} width
 * @param {number} height
 * @returns {Fit}
 * @method
 */
ImageRequest.prototype.fit = function (width, height) {
    return new Fit(this.baseUrl, this.imageId, this.imageName, this.version, width, height);
};
/**
 * @summary Configures this image using the 'crop' operation.
 * @param {number} width
 * @param {number} height
 * @param {number} x
 * @param {number} y
 * @param {number?} upscaleFactor
 * @returns {Crop}
 * @method
 */
ImageRequest.prototype.crop = function (width, height, x, y, upscaleFactor) {
    return new Crop(this.baseUrl, this.imageId, this.imageName, this.version, width, height, x, y, upscaleFactor);
};

/**
 * @param {string} host
 * @param {ImageDTO} imageDto
 * @returns ImageRequest
 */
ImageRequest.prototype.fromDTO = function (host, imageDto) {
    var parts = imageDto.fileUrl.split('/');
    var bucket = parts[0] + '/' + parts[1];
    this.baseUrl = host + bucket;
    this.imageId = imageDto.fileName;
    this.imageName = imageDto.originalFileName;
    
    return this;
};

/**
 * @type {ImageRequest}
 */
module.exports = ImageRequest;