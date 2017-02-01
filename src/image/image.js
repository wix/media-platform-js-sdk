var parseFileDescriptor = require('./parser/file-descriptor-parser');
var parseUrl = require('./parser/url-parser');
var Canvas = require('./operation/canvas');
var Crop = require('./operation/crop');
var Fill = require('./operation/fill');
var Fit = require('./operation/fit');
var ROI = require('./region-of-interest');
var Container = require('./container');

/**
 * @description a configurable object that supports all the operations, filters and adjustments supported by Wix Media Platform
 * @param {FileDescriptor|string} data the file descriptor or a previously generated image url
 * @constructor Image
 */
function Image(data) {

    /**
     * @description where the image is hosted
     * @type {string}
     */
    this.host = host;

    /**
     * @description the image location
     * @type {string}
     */
    this.path = path;

    /**
     * @description the source image metadata
     * @type {Metadata}
     */
    this.metadata = metadata;

    /**
     * @description the API version
     * @type {string}
     */
    this.version = 'v1';

    /**
     * @type {null}
     */
    this.operation = null;

    if (data) {
        if (typeof data === 'string') {
            parseUrl(this, data);
        } else {
            parseFileDescriptor(this, data);
        }
    }
}

/**
 * @summary fills the given width, the height is derived from the region of interest aspect ratio.
 * @param {number} width
 * @param {ROI?} roi Region of interest, if not provided, the entire image is taken
 * @returns {Image}
 */
Image.prototype.scaleToWidth = function (width, roi) {
    var container = new Container().setWidth(width);

    return this.fillContainer(container, roi);
};

/**
 * @summary fills the given height, the width is derived from the region of interest aspect ratio.
 * @param {number} height
 * @param {ROI?} roi Region of interest, if not provided, the entire image is taken
 * @returns {Image}
 */
Image.prototype.scaleToHeight = function (height, roi) {
    var container = new Container().setHeight(height);

    return this.fillContainer(container, roi);
};

/**
 * @param {Container} container
 * @param {ROI?} roi
 * @returns {Image}
 */
Image.prototype.fillContainer = function (container, roi) {
    if (!roi) {
        roi = new ROI(this.metadata.width, this.metadata.height, 0, 0);
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
 * @returns {Image}
 */
Image.prototype.crop = function (width, height, x, y, upscaleFactor) {
    this.operation = new Crop(this.baseUrl, this.imageId, this.imageName, this.version, width, height, x, y, upscaleFactor, this.metadata);
    return this;
};

/**
 * @summary Configures this image using the 'fill' operation.
 * @param {number} width
 * @param {number} height
 * @returns {Image}
 */
Image.prototype.fill = function (width, height) {
    this.operation = new Fill(this.baseUrl, this.imageId, this.imageName, this.version, width, height, this.metadata);
    return this;
};

/**
 * @summary Configures this image using the 'fit' operation.
 * @param {number} width
 * @param {number} height
 * @returns {Image}
 */
Image.prototype.fit = function (width, height) {
    this.operation = new Fit(this.baseUrl, this.imageId, this.imageName, this.version, width, height, this.metadata);
    return this;
};

/**
 * @summary Configures this image using the 'canvas' operation.
 * @param {number} width
 * @param {number} height
 * @returns {Image}
 */
Image.prototype.canvas = function (width, height) {
    this.operation = new Canvas(this.baseUrl, this.imageId, this.imageName, this.version, width, height, this.metadata);
    return this;
};

/**
 * @type {Image}
 */
module.exports = Image;