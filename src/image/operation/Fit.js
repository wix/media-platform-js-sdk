/**
 * Created by elad on 06/06/2016.
 */
var util = require('util');
var BaseOperation = require('./BaseOperation');
var Resize = require('./resize/Resize');

/**
 * @summary Resizes the image to fit to the specified width and height while retaining original image proportion.
 * @description The entire image will be visible but not necessarily fill the area specified by the width and height.
 * @constructor Fit
 * @extends BaseOperation
 */
function Fit() {
    BaseOperation.call(this, 'fit');

    this.resize = new Resize();

    this.serializationOrder.push(this.resize);
}
util.inherits(Fit, BaseOperation);

/**
 * @type {Fit}
 */
module.exports = Fit;