var parseUrl = require('./parser/image-url-parser');
var parseFileDescriptor = require('./parser/file-descriptor-parser');
var parseFileMetadata = require('./parser/file-metadata-parser');
var FileDescriptor = require('../platform/management/metadata/file-descriptor');
var FileMetadata = require('../platform/management/metadata/file-metadata');
var Crop = require('./framing/crop');
var Rectangle = require('../geometry/rectangle');
var Dimension = require('../geometry/dimension');
var UnsharpMask = require('./filter/unsharp-mask');
var Blur = require('./filter/blur');
var Brightness = require('./filter/brightness');
var Contrast = require('./filter/contrast');
var Hue = require('./filter/hue');
var Saturation = require('./filter/saturation');
var JPEG = require('./encoder/jpeg');
var validator = require('./validation/validator');

/**
 * @description a configurable object that supports all the operations, filters and adjustments supported by Wix Media Platform
 * @param {FileDescriptor|FileMetadata|string} data the file descriptor or a previously generated image url
 * @constructor Image
 */
function Image(data) {

    /**
     * @description where the image is hosted
     * @type {string|null}
     */
    this.host = null;

    /**
     * @description the image path in host
     * @type {string}
     */
    this.path = null;

    /**
     * @type {string}
     */
    this.fileName = null;

    /**
     * @description the source image metadata
     * @type {Metadata}
     */
    this.metadata = null;

    /**
     * @description the API version
     * @type {string}
     */
    this.version = 'v1';

    /**
     * @description the selected geometry
     * @type {Object}
     */
    this.geometry = null;

    /**
     * @type {UnsharpMask}
     */
    var unsharpMask = new UnsharpMask(this);
    this.unsharpMask = (function () {
        return unsharpMask.configuration;
    })();

    /**
     * @type {Blur}
     */
    var blur = new Blur(this);
    this.blur = (function () {
        return blur.percentage;
    })();

    /**
     * @type {Brightness}
     */
    var brightness = new Brightness(this);
    this.brightness = (function () {
        return brightness.brightness;
    })();

    /**
     * @type {Contrast}
     */
    var contrast = new Contrast(this);
    this.contrast = (function () {
        return contrast.contrast;
    })();

    /**
     * @type {Hue}
     */
    var hue = new Hue(this);
    this.hue = (function () {
        return hue.hue;
    })();


    /**
     * @type {Saturation}
     */
    var saturation = new Saturation(this);
    this.saturation = (function () {
        return saturation.saturation;
    })();

    /**
     * @type {JPEG}
     */
    var jpeg = new JPEG(this);
    this.jpeg = (function () {
        return jpeg.compression;
    })();


    if (data) {
        if (typeof data === 'string') {
            parseUrl(this, data);
        } else if (data instanceof FileDescriptor) {
            parseFileDescriptor(this, data);
        } else if (data instanceof FileMetadata){
            parseFileMetadata(this, data);
        }
    }

    this.serializationOrder = [unsharpMask, blur, brightness, contrast, hue, saturation, jpeg];
}

/**
 * @summary fills the given width, the height is derived from the region of interest aspect ratio.
 * @param {number} width
 * @param {Rectangle?} regionOfInterest Region of interest, if not provided, the entire image is taken
 * @returns {Image}
 */
Image.prototype.scaleToWidth = function (width, regionOfInterest) {
    var container = new Dimension().setWidth(width);

    return this.fillContainer(container, regionOfInterest);
};

/**
 * @summary fills the given height, the width is derived from the region of interest aspect ratio.
 * @param {number} height
 * @param {Rectangle?} regionOfInterest Region of interest, if not provided, the entire image is taken
 * @returns {Image}
 */
Image.prototype.scaleToHeight = function (height, regionOfInterest) {
    var container = new Dimension().setHeight(height);

    return this.fillContainer(container, regionOfInterest);
};

/**
 * @param {Dimension} container
 * @param {Rectangle?} regionOfInterest
 * @returns {Image}
 */
Image.prototype.fillContainer = function (container, regionOfInterest) {
    if (!regionOfInterest) {
        regionOfInterest = new Rectangle(this.metadata.width, this.metadata.height, 0, 0);
    }

    if (!this.metadata) {
        throw new Error('client side manipulation requires image basic metadata');
    }

    var roiAspectRatio = regionOfInterest.width / regionOfInterest.height;
    var containerWidth = Math.round(container.width ? container.width : (container.height * roiAspectRatio));
    var containerHeight = Math.round(container.height ? container.height : (container.width / roiAspectRatio));
    var containerAspectRatio = container.width / container.height;

    var scale;
    if (containerAspectRatio <= 1) {                //portrait -> portrait, landscape/square -> portrait/square
        scale = containerHeight / regionOfInterest.height;
    } else {                                        //portrait/square -> landscape/square, //landscape -> landscape
        scale = containerWidth / regionOfInterest.width;
    }

    var x = Math.floor(regionOfInterest.x * scale);
    var y = Math.floor(regionOfInterest.y * scale);
    var height = Math.floor(regionOfInterest.height * scale);
    var width = Math.floor(regionOfInterest.width * scale);

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
 * @param {number?} x
 * @param {number?} y
 * @param {number?} scale
 * @returns {Image}
 */
Image.prototype.crop = function (width, height, x, y, scale) {
    this.geometry = new Crop(width, height, x ? x : 0, y ? y : 0, scale ? scale : 1);
    return this;
};

/**
 * @summary serializes the Image to the URL
 * @param {string?} host where the image is hosted, default to '//'
 * @returns {{url: string|null, error: Error|null}}
 */
Image.prototype.toUrl = function (host) {

    if (!this.geometry) {
        return {
            url: null,
            error: new Error('geometry not defined')
        };
    }

    var baseUrl = host || this.host || '';

    var url = '';
    if (baseUrl.length != 0 && baseUrl.indexOf('http') != 0 && baseUrl.indexOf('//') != 0) {
        url += '//';
    }

    if (baseUrl.lastIndexOf('/') == (baseUrl.length - 1)) {
        baseUrl = baseUrl.slice(0, -1);
    }

    var path = this.path;
    if (path.indexOf('/') == 0) {
        path = path.slice(1);
    }

    var geometryParams = this.geometry.serialize();
    if (geometryParams.error) {
        return {
            url: null,
            error: new Error(geometryParams.error)
        }
    }

    var filtersAndEncoderParams = this.collectParams();
    if (filtersAndEncoderParams.errors.length > 0) {
        return {
            url: null,
            error: new Error(filtersAndEncoderParams.errors)
        }
    }
    url += baseUrl + '/' + path + '/' + this.version + '/';
    url += geometryParams.params + filtersAndEncoderParams.params + '/' + encodeURIComponent(this.fileName);
    if (this.metadata) {
        url += '#' + this.metadata.serialize();
    }
    return {
        url: url,
        error: null
    }
};

/**
 * @returns {{params: string, errors: Array<string>}}
 * @private
 */
Image.prototype.collectParams = function () {
    var out = '';
    var part;
    var errors = [];
    this.serializationOrder.forEach(function concat(op) {
        part = op.serialize();
        if (part.error) {
            errors.push(part.error);
        }
        if (out.length > 0 && part.params && part.params.length > 0) {
            out += ',';
        }
        out += part.params;
    });

    if (out.length > 0) {
        out = ',' + out;
    }
    return {
        params: out,
        errors: errors
    };
};

/**
 * @type {Image}
 */
module.exports = Image;