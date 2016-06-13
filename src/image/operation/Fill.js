/**
 * Created by elad on 06/06/2016.
 */
var util = require('util');
var BaseOperation = require('./BaseOperation');
var Align = require('./align/Align');
var Resize = require('./resize/Resize');

/**
 * @summary Create an image with the exact given width and height while retaining original proportions.
 * @description Uses only part of the image that fills the given dimensions. Only part of the original image
 * might be visible if the required proportions are different than the original ones.
 * @constructor Fill
 * @extends BaseOperation
 */
function Fill() {
    BaseOperation.call(this, 'fill');

    this.align = new Align();
    this.resize = new Resize();
    
    this.serializationOrder.push(this.align, this.resize);
}
util.inherits(Fill, BaseOperation);

/**
 * @type {Fill}
 */
module.exports = Fill;