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

var imageUrl = require('../url/image-url');

/**
 * @param {string} name
 * @param {string} baseUrl
 * @param {string} imageId
 * @param {string} imageName
 * @param {string} version
 * @param {function(Error?)?} callback
 * @constructor
 */
function BaseOperation(name, baseUrl, imageId, imageName, version, callback) {

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
     * @type {function(Error?)|null}
     */
    this.callback = callback || null; 
    
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

    /**
     * @type {Size}
     */
    var size = new Size(this);
    this.size = (function () {
        return size.size;
    })();

    this.serializationOrder = [brightness, contrast, hue, saturation, blur, negative, oil, pixelate, pixelateFaces,
        redEyeRemover, sharpen, unsharpMask, jpeg, size];
}

/**
 * @returns {string}
 */
BaseOperation.prototype.serialize = function () {
    var out = '';
    var part = '';
    this.serializationOrder.forEach(function concat(op) {
        part = op.serialize();
        if (out.length > 0 && part.length > 0) {
            out += ',';    
        }
        out += part;
    });
    return out;
};

/**
 * @returns {string}
 */
BaseOperation.prototype.toUrl = function () {
    return imageUrl.toUrl(this);   
};

/**
 * @type {BaseOperation}
 */
module.exports = BaseOperation;