var util = require('util');
var BaseOperation = require('./BaseOperation');
var Align = require('./align/Align');
var Background = require('./background/Background');

/**
 * @summary Resizes the image canvas.
 * @description Fills the width and height boundaries and crops any excess image data.
 * The resulting image will match the width and height constraints without scaling the image.
 * @constructor Canvas
 * @extends BaseOperation
 */
function Canvas(baseUrl, imageId, imageName, version) {
    BaseOperation.call(this, 'canvas', baseUrl, imageId, imageName, version);
    
    this.background = new Background(this);
    this.align = new Align(this);
    
    this.serializationOrder.push(this.align, this.background);
}
util.inherits(Canvas, BaseOperation);

/**
 * @type {Canvas}
 */
module.exports = Canvas;