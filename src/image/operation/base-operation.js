var Size = require('./size/size');
var Sharpen = require('./effect/sharpen');
var UnsharpMask = require('./effect/unsharp-mask');
var RedEyeRemover = require('./effect/red-eye-remover');
var Oil = require('./effect/oil');
var Pixelate = require('./effect/pixelate');
var PixelateFaces = require('./effect/pixelate-faces');
var Negative = require('./effect/negative');
var Blur = require('./effect/blur');
var JPEGSettings = require('./jpeg/jpeg-settings');
var Brightness = require('./chromaticity/brightness');
var Contrast = require('./chromaticity/contrast');
var Hue = require('./chromaticity/hue');
var Saturation = require('./chromaticity/saturation');

/**
 * @param {string} name
 * @param {string} baseUrl
 * @param {string} imageId
 * @param {string} imageName
 * @param {string} version
 * @param {number} width
 * @param {number} height
 * @param {OriginalFileData?} originalFileData
 * @constructor
 */
function BaseOperation(name, baseUrl, imageId, imageName, version, width, height, originalFileData) {

    /**
     * @type {string}
     */
    this.name = name;

    /**
     * @type {string}
     */
    this.baseUrl = baseUrl;

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
    this.version = version;

    /**
     * @type {OriginalFileData}
     */
    this.originalFileData = originalFileData;

    /**
     * @type {Size}
     */
    var size = new Size(this);
    size.size(width, height);
    this.size = (function () {
        return size.size;
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
     * @type {Blur}
     */
    var blur = new Blur(this);
    this.blur = (function () {
        return blur.percentage;
    })();

    /**
     * @type {Negative}
     */
    var negative = new Negative(this);
    this.negative = (function () {
        return negative.activate;
    })();

    /**
     * @type {Oil}
     */
    var oil = new Oil(this);
    this.oil = (function () {
        return oil.activate;
    })();

    /**
     * @type {Pixelate}
     */
    var pixelate = new Pixelate(this);
    this.pixelate = (function () {
        return pixelate.pixels;
    })();

    /**
     * @type {PixelateFaces}
     */
    var pixelateFaces = new PixelateFaces(this);
    this.pixelateFaces = (function () {
        return pixelateFaces.pixels;
    })();

    /**
     * @type {RedEyeRemover}
     */
    var redEyeRemover = new RedEyeRemover(this);
    this.removeRedEye = (function () {
        return redEyeRemover.activate;
    })();

    /**
     * @type {Sharpen}
     */
    var sharpen = new Sharpen(this);
    this.sharpen = (function () {
        return sharpen.sharpen;
    })();

    /**
     * @type {UnsharpMask}
     */
    var unsharpMask = new UnsharpMask(this);
    this.unsharpMask = (function () {
        return unsharpMask.configuration;
    })();

    /**
     * @type {JPEGSettings}
     */
    var jpeg = new JPEGSettings(this);
    this.jpeg = (function () {
        return jpeg.compression;
    })();

    this.serializationOrder = [brightness, contrast, hue, saturation, blur, negative, oil, pixelate, pixelateFaces,
        redEyeRemover, sharpen, unsharpMask, jpeg, size];
}

/**
 * @returns {OriginalFileData|null}
 */
BaseOperation.prototype.getOriginalFileData = function () {
    return this.originalFileData;
};

/**
 * @returns {{url: string|null, error: Error|null}}
 */
BaseOperation.prototype.toUrl = function () {

    var out = '';
    var baseUrl = this.baseUrl;
    if (baseUrl !== null && baseUrl !== '') {
        if (baseUrl.indexOf('http') != 0 && baseUrl.indexOf('//') != 0) {
            out += '//';
        }

        if (baseUrl.lastIndexOf('/') == (baseUrl.length - 1)) {
            baseUrl = baseUrl.slice(0, -1);
        }
    }

    out += baseUrl + '/' + this.imageId + '/' + this.version + '/' + this.name + '/';

    var result = this.collect();

    if (result.errors.length > 0) {
        return {
            url: null,
            error: new Error(result.errors)
        }
    }

    return {
        url: out + result.params + '/' + encodeURIComponent(this.imageName) + (this.originalFileData ? '#' + this.originalFileData.serialize() : ''),
        error: null
    }
};

/**
 * @returns {{params: string, errors: Array<string>}}
 */
BaseOperation.prototype.collect = function () {
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
    return {
        params: out,
        errors: errors
    };
};

/**
 * @type {BaseOperation}
 */
module.exports = BaseOperation;