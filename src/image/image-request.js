var Canvas = require('./operation/canvas');
var Crop = require('./operation/crop');
var Fill = require('./operation/fill');
var Fit = require('./operation/fit');
var ROI = require('./region-of-interest');
var Container = require('./container');

/**
 * @summary a ImageRequest is a configurable object that supports all the operations, filters and adjustments supported by Wix Media Platform
 * @param {string} baseUrl the base URL where the image is hosted
 * @param {string} imageId the id of the image to manipulate
 * @param {string} imageName the name of the image to manipulate
 * @param {OriginalImageData} originalImageData
 * @constructor ImageRequest
 */
function ImageRequest(baseUrl, imageId, imageName, originalImageData) {

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
    this.imageName = imageName || 'file.jpg';

    /**
     * @type {OriginalImageData}
     * @deprecated use originalImageData instead
     */
    this.originalFileData = originalImageData;

    /**
     * @type {OriginalImageData}
     */
    this.originalImageData = originalImageData;

    /**
     * @type {string}
     */
    this.version = 'v1';
}

/**
 * @summary fills the given width, the height is derived from the region of interest aspect ratio.
 * @param {number} width
 * @param {ROI?} roi if not provided, the entire image is taken
 * @returns {Crop}
 */
ImageRequest.prototype.scaleToWidth = function (width, roi) {
    var container = new Container().setWidth(width);

    return this.fillContainer(container, roi);
};

/**
 * @summary fills the given height, the width is derived from the region of interest aspect ratio.
 * @param {number} height
 * @param {ROI?} roi if not provided, the entire image is taken
 * @returns {Crop}
 */
ImageRequest.prototype.scaleToHeight = function (height, roi) {
    var container = new Container().setHeight(height);

    return this.fillContainer(container, roi);
};

/**
 * @param {Container} container
 * @param {ROI?} roi
 * @returns {Crop}
 */
ImageRequest.prototype.fillContainer = function (container, roi) {
    // TODO: input validation
    // if (this.originalImageData.width < (roi.x + roi.width)) {
    //     return new Error('roi width is out of bound');
    // }
    //
    // if (this.originalImageData.height < (roi.y + roi.height)) {
    //     return new Error('roi height is out of bound');
    // }

    if (!roi) {
        roi = new ROI(this.originalImageData.width, this.originalImageData.height, 0, 0);
    }

    var roiAspectRatio = roi.width / roi.height;
    var containerWidth = Math.round(container.width ? container.width : (container.height * roiAspectRatio));
    var containerHeight = Math.round(container.height ? container.height : (container.width / roiAspectRatio));
    var containerAspectRatio = container.width / container.height;

    var scale;
    if (containerAspectRatio <= 1) {                //portrait -> portrait, landscape/square -> portrait/square
        scale = containerHeight / roi.height;
    } else {                                        //portrait/square -> landscape/square, //landscape -> landscape
        scale = containerWidth / roi.width;
    }

    var x = Math.floor(roi.x * scale);
    var y = Math.floor(roi.y * scale);
    var height = Math.floor(roi.height * scale);
    var width = Math.floor(roi.width * scale);

    //TODO: handle bleeding top, bottom, left, right
    var verticalPadding = containerHeight - height;
    height += verticalPadding;
    var verticalOffset = Math.floor(verticalPadding/2);
    if ((y - verticalOffset) < 0) {
        y = 0;
    } else {
        y -= verticalOffset;
    }

    var horizontalPadding = containerWidth - width;
    width += horizontalPadding;
    var horizontalOffset = Math.floor(horizontalPadding/2);
    if ((x - horizontalOffset) < 0) {
        x = 0;
    } else {
        x -= horizontalOffset;
    }

    return this.crop(width, height, x, y, scale);
};

/**
 * @summary Configures this image using the 'crop' operation.
 * @param {number} width
 * @param {number} height
 * @param {number} x
 * @param {number} y
 * @param {number?} upscaleFactor
 * @returns {Crop}
 */
ImageRequest.prototype.crop = function (width, height, x, y, upscaleFactor) {
    return new Crop(this.baseUrl, this.imageId, this.imageName, this.version, width, height, x, y, upscaleFactor, this.originalImageData);
};

/**
 * @summary Configures this image using the 'fill' operation.
 * @param {number} width
 * @param {number} height
 * @returns {Fill}
 */
ImageRequest.prototype.fill = function (width, height) {
    return new Fill(this.baseUrl, this.imageId, this.imageName, this.version, width, height, this.originalImageData);
};

/**
 * @summary Configures this image using the 'fit' operation.
 * @param {number} width
 * @param {number} height
 * @returns {Fit}
 */
ImageRequest.prototype.fit = function (width, height) {
    return new Fit(this.baseUrl, this.imageId, this.imageName, this.version, width, height, this.originalImageData);
};

/**
 * @summary Configures this image using the 'canvas' operation.
 * @param {number} width
 * @param {number} height
 * @returns {Canvas}
 */
ImageRequest.prototype.canvas = function (width, height) {
    return new Canvas(this.baseUrl, this.imageId, this.imageName, this.version, width, height, this.originalImageData);
};

//TODO: support operation switching

/**
 * @type {ImageRequest}
 */
module.exports = ImageRequest;