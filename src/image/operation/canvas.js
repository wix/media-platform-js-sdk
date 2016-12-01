var inherits = require('inherits');
var BaseOperation = require('./base-operation');
var Align = require('./align/align');
var Background = require('./background/background');

/**
 * @description Fills the width and height boundaries and crops any excess image data. The resulting image will match the width and height constraints without scaling the image.
 * @param {string} baseUrl
 * @param {string} imageId
 * @param {string} imageName
 * @param {string} version
 * @param {number} width
 * @param {number} height
 * @param {OriginalImageData} originalImageData
 * @constructor Canvas
 * @extends BaseOperation
 */
function Canvas(baseUrl, imageId, imageName, version, width, height, originalImageData) {
    BaseOperation.call(this, 'canvas', baseUrl, imageId, imageName, version, width, height, originalImageData);

    /**
     * @type {Align}
     */
    var align = new Align(this);
    this.alignment = (function () {
        return align.alignment;
    })();
    
    /**
     * @type {Background}
     */
    var background = new Background(this);
    this.background = (function () {
        return background.color;
    })();
    
    this.serializationOrder.push(align, background);
}
inherits(Canvas, BaseOperation);

/**
 * @type {Canvas}
 */
module.exports = Canvas;