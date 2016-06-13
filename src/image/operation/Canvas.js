/**
 * Created by elad on 06/06/2016.
 */
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
function Canvas() {
    BaseOperation.call(this, 'canvas');
    
    this.background = new Background();
    this.align = new Align();
    
    this.serializationOrder.push(this.align, this.background);
}
util.inherits(Canvas, BaseOperation);

/**
 * @type {Canvas}
 */
module.exports = Canvas;