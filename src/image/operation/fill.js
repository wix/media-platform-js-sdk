var util = require('util');
var BaseOperation = require('./base-operation');
var Align = require('./align/align');
var ResizeSettings = require('./resize/resize-settings');

/**
 * @summary Create an image with the exact given width and height while retaining original proportions.
 * @description Uses only part of the image that fills the given dimensions. Only part of the original image
 * might be visible if the required proportions are different than the original ones.
 * @constructor Fill
 * @extends BaseOperation
 */
function Fill(baseUrl, imageId, imageName, version, width, height) {
    BaseOperation.call(this, 'fill', baseUrl, imageId, imageName, version, width, height);

    /**
     * @type {Align}
     */
    var align = new Align(this);
    this.alignment = (function () {
        return align.alignment;
    })();

    /**
     * @type {ResizeSettings}
     */
    var resize = new ResizeSettings(this);
    this.enableUpscale = (function () {
        return resize.enableUpscale;
    })();
    
    this.serializationOrder.push(align, resize);
}
util.inherits(Fill, BaseOperation);

/**
 * @type {Fill}
 */
module.exports = Fill;