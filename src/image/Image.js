var parser = require('./parser');
var Canvas = require('./operation/Canvas');
var Crop = require('./operation/Crop');
var Fill = require('./operation/Fill');
var Fit = require('./operation/Fit');

/**
 * @summary a Image is a configurable object that supports all the operations, filters and adjustments supported by Wix Media Platform
 * @param {String?} baseUrl the base URL where the image is hosted
 * @param {String?} imageId the id of the image to manipulate
 * @param {String?} name the name of the image to manipulate
 * @constructor Image
 */
function Image(baseUrl, imageId, imageName) {
    /**
     * @type {string}
     */
    this.endpoint = baseUrl.trim();
    /**
     * @type {string}
     */
    this.imageId = imageId.trim();
    /**
     * @type {string}
     */
    this.version = 'v1';

    /**
     * @type {BaseOperation}
     */
    this.operation = null;

    /**
     * @type {string}
     */
    this.imageName = imageName;
}

/**
 * @summary Configures this image using the 'canvas' operation.
 * @param {Object} [data=null] optional configuration data for this operation
 * @param {Object} [filter=null] optional configuration data for image adjustments
 * @param {Object} [adjust=null] optional configuration data for image filters
 * @returns {Canvas}
 * @method
 */
Image.prototype.canvas = function (data, filter, adjust) {
    return new Canvas(this.endpoint, this.imageId, this.version, data, filter, adjust).name(this.name);
};
/**
 * @summary Configures this image using the 'fill' operation.
 * @param {Object} [data=null] optional configuration data for this operation
 * @param {Object} [filter=null] optional configuration data for image adjustments
 * @param {Object} [adjust=null] optional configuration data for image filters
 * @returns {Fill}
 * @method
 */
Image.prototype.fill = function (data, filter, adjust) {
    return new Fill(this.endpoint, this.imageId, this.version, data, filter, adjust).name(this.name);
};
/**
 * @summary Configures this image using the 'fit' operation.
 * @param {Object} [data=null] optional configuration data for this operation
 * @param {Object} [filter=null] optional configuration data for image adjustments
 * @param {Object} [adjust=null] optional configuration data for image filters
 * @returns {Fit}
 * @method
 */
Image.prototype.fit = function (data, filter, adjust) {
    return new Fit(this.endpoint, this.imageId, this.version, data, filter, adjust).name(this.name);
};
/**
 * @summary Configures this image using the 'crop' operation.
 * @param {Object} [data=null] optional configuration data for this operation
 * @param {Object} [filter=null] optional configuration data for image adjustments
 * @param {Object} [adjust=null] optional configuration data for image filters
 * @returns {Crop}
 * @method
 */
Image.prototype.crop = function (data, filter, adjust) {
    return new Crop(this.endpoint, this.imageId, this.version, data, filter, adjust).name(this.name);
};

/**
 * @summary Returns the URL of the configured image
 * @returns {String} the URL of the image
 */
Image.prototype.toUrl = function () {

    var prefix = "";
    if (this.endpoint !== null && this.endpoint.length > 4 && this.endpoint.substring(0, 4) !== "http") {
        if (this.endpoint.substring(0, 2) !== "//") {
            prefix = "//";
        }
    }

    var out = prefix + this.endpoint + "/" + this.imageId + "/" + this.version + "/" + this.name + "/";

    var params = this.operation.serialize();
    if (this.hasAdjustments()) {
        if (params.length > 0) {
            params += ",";
        }
        params += this.outputParams(this.adjustments);
    }
    if (this.hasFilters()) {
        if (params.length > 0) {
            params += ",";
        }
        params += this.outputParams(this.filters);
    }
    return out + params + "/" + this.imageName;
};

Image.prototype.fromUrl = function (url) {
    var data = parser.parse(url);
    var image = null, filter = null, adjust = null;
    if (data.api) {
        if (data.api.hasOwnProperty('fit')) {
            image = new Fit(data.endpoint, data.imageId, data.version, data.api.fit, data.api.filter, data.api.adjust).name(data.imageName);
        } else if (data.api.hasOwnProperty('canvas')) {
            image = new Canvas(data.endpoint, data.imageId, data.version, data.api.canvas, data.api.filter, data.api.adjust).name(data.imageName);
        } else if (data.api.hasOwnProperty('fill')) {
            image = new Fill(data.endpoint, data.imageId, data.version, data.api.fill, data.api.filter, data.api.adjust).name(data.imageName);
        } else if (data.api.hasOwnProperty('crop')) {
            image = new Crop(data.endpoint, data.imageId, data.version, data.api.crop, data.api.filter, data.api.adjust).name(data.imageName);
        }
        if (image === null) {
            return filter !== null ? filter : adjust;
        }
    }
    return image;
};

module.exports = Image;