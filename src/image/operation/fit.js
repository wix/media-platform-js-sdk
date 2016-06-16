var util = require('util');
var BaseOperation = require('./base-operation');
var ResizeSettings = require('./resize/resize-settings');

/**
 * @summary Resizes the image to fit to the specified width and height while retaining original image proportion.
 * @description The entire image will be visible but not necessarily fill the area specified by the width and height.
 * @constructor Fit
 * @extends BaseOperation
 */
function Fit(baseUrl, imageId, imageName, version) {
    BaseOperation.call(this, 'fit', baseUrl, imageId, imageName, version);

    /**
     * @type {ResizeSettings}
     */
    var resize = new ResizeSettings(this);
    this.enableUpscale = (function () {
        return resize.enableUpscale;
    })();

    this.serializationOrder.push(resize);
}
util.inherits(Fit, BaseOperation);

/**
 * @type {Fit}
 */
module.exports = Fit;