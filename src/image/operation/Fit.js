var util = require('util');
var BaseOperation = require('./BaseOperation');
var Resize = require('./resize/Resize');

/**
 * @summary Resizes the image to fit to the specified width and height while retaining original image proportion.
 * @description The entire image will be visible but not necessarily fill the area specified by the width and height.
 * @constructor Fit
 * @extends BaseOperation
 */
function Fit(baseUrl, imageId, imageName, version) {
    BaseOperation.call(this, 'fit', baseUrl, imageId, imageName, version);

    this.resize = new Resize(this);

    this.serializationOrder.push(this.resize);
}
util.inherits(Fit, BaseOperation);

/**
 * @type {Fit}
 */
module.exports = Fit;