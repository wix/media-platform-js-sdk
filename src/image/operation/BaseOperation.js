/**
 * Created by elad on 06/06/2016.
 */

var Size = require('./size/Size');
var Chromaticity = require('./chromaticity/Chromaticity');
var Sharpen = require('./effect/Sharpen');
var UnsharpMask = require('./effect/UnsharpMask');
var RedEyeRemover = require('./effect/RedEyeRemover');
var Oil = require('./effect/Oil');
var Pixelate = require('./effect/Pixelate');
var PixelateFaces = require('./effect/PixelateFaces');
var Negative = require('./effect/Negative');
var Blur = require('./effect/Blur');
var JPEG = require('./jpeg/JPEG');


/**
 * @param {string} name
 * @constructor
 */
function BaseOperation(name) {
    /**
     * @type {string}
     */
    this.name = name;

    this.size = new Size();
    this.chromaticity = new Chromaticity();
    this.sharpen = new Sharpen();
    this.unsharpMask = new UnsharpMask();
    this.redEyeRemover = new RedEyeRemover();
    this.oil = new Oil();
    this.pixelate = new Pixelate();
    this.pixelateFaces = new PixelateFaces();
    this.negative = new Negative();
    this.blur = new Blur();
    this.jpeg = new JPEG();
    
    this.serializationOrder = [this.size, this.chromaticity, this.sharpen, this.unsharpMask,
        this.redEyeRemover, this.oil, this.pixelate, this.pixelateFaces, this.negative, this.blur, this.jpeg];
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
 * @type {BaseOperation}
 */
module.exports = BaseOperation;