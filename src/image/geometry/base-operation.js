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
var validator = require('./validation/validator');

/**
 * @param {string} name
 * @param {string} host
 * @param {string} path
 * @param {string} fileName
 * @param {string} version
 * @param {number} width
 * @param {number} height
 * @param {Metadata} metadata
 * @constructor
 */
function BaseOperation(name, host, path, fileName, version, width, height, metadata) {

    /**
     * @type {string}
     */
    this.name = name;

    /**
     * @type {string}
     */
    this.host = host;

    /**
     * @type {string}
     */
    this.path = path;

    /**
     * @type {string}
     */
    this.fileName = fileName;

    /**
     * @type {string}
     */
    this.version = version;

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
     * @type {Metadata}
     */
    this.metadata = metadata;

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

    //TODO: replace with sorted Set (lexical sort by key)
    this.serializationOrder = [brightness, contrast, hue, saturation, blur, negative, oil, pixelate, pixelateFaces,
        redEyeRemover, sharpen, unsharpMask, jpeg];
}

/**
 * @summary The width constraint
 * @param {number} width a number greater than `0`
 * @param {number} height a number greater than `0`
 * @returns {*} the operation
 */
BaseOperation.prototype.size = function (width, height) {
    this.width = Math.round(width);
    this.height = Math.round(height);
    return this;
};

/**
 * @returns {{url: string|null, error: Error|null}}
 */
BaseOperation.prototype.toUrl = function () {

    if (!this.metadata) {
        return {
            url: null,
            error: new Error('metadata is mandatory')
        };
    }

    var errorMassage = validator.numberIsNotGreaterThan('width', this.width, 1) ||
        validator.numberIsNotGreaterThan('height', this.height, 1);

    if (errorMassage) {
        return {
            url: null,
            error: new Error(errorMassage)
        };
    }

    var out = '';
    var baseUrl = this.host;
    if (baseUrl !== null && baseUrl !== '') {
        if (baseUrl.indexOf('http') != 0 && baseUrl.indexOf('//') != 0) {
            out += '//';
        }

        if (baseUrl.lastIndexOf('/') == (baseUrl.length - 1)) {
            baseUrl = baseUrl.slice(0, -1);
        }
    }

    out += baseUrl + '/' + this.path + '/' + this.version + '/' + this.name + '/';

    var result = this.collectParams();

    if (result.errors.length > 0) {
        return {
            url: null,
            error: new Error(result.errors)
        }
    }

    return {
        url: out + 'w_' + this.width + ',h_' + this.height + result.params + '/' + encodeURIComponent(this.fileName) + '#' + this.metadata.serialize(),
        error: null
    }
};

/**
 * @returns {{params: string, errors: Array<string>}}
 */
BaseOperation.prototype.collectParams = function () {
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
 * @type {BaseOperation}
 */
module.exports = BaseOperation;