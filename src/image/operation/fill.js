var inherits = require('inherits');
var BaseOperation = require('./base-operation');
var Align = require('./align/align');
var ResizeSettings = require('./resize/resize-settings');

/**
 * @param baseUrl
 * @param imageId
 * @param imageName
 * @param version
 * @param width
 * @param height
 * @param originalFileData
 * @summary Create an image with the exact given width and height while retaining original proportions.
 * @description Uses only part of the image that fills the given dimensions. Only part of the original image might be visible if the required proportions are different than the original ones.
 * @constructor Fill
 * @extends BaseOperation
 */
function Fill(baseUrl, imageId, imageName, version, width, height, originalFileData) {
    BaseOperation.call(this, 'fill', baseUrl, imageId, imageName, version, width, height, originalFileData);

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
inherits(Fill, BaseOperation);

/**
 * @type {Fill}
 */
module.exports = Fill;