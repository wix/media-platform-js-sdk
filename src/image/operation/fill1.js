var util = require('util');
var BaseOperation = require('./base-operation');
var Align = require('./align/Align');
var Resize = require('./resize/Resize');

/**
 * @summary Create an image with the exact given width and height while retaining original proportions.
 * @description Uses only part of the image that fills the given dimensions. Only part of the original image
 * might be visible if the required proportions are different than the original ones.
 * @constructor Fill
 * @extends BaseOperation
 */
function Fill(baseUrl, imageId, imageName, version) {
    BaseOperation.call(this, 'fill', baseUrl, imageId, imageName, version);

    /**
     * @type {Align}
     */
    var align = new Align(this);
    this.alignment = (function () {
        return align.alignment;
    })();

    /**
     * @type {Resize}
     */
    var resize = new Resize(this);
    this.configuration = (function () {
        return resize.configuration;
    })();
    
    this.serializationOrder.push(align, resize);
}
util.inherits(Fill, BaseOperation);

/**
 * @type {Fill}
 */
module.exports = Fill;