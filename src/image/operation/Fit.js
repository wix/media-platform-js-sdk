/**
 * Created by elad on 06/06/2016.
 */
var util = require('util');
var BaseOperation = require('./BaseOperation');
var ResizeFilterMixin = require('../mixin/ResizeFilterMixin');

/**
 * @summary Resizes the image to fit to the specified width and height while retaining original image proportion.
 * @description The entire image will be visible but not necessarily fill the area specified by the width and height.
 * @constructor Fit
 * @mixes BaseOperation
 * @mixes ResizeFilterMixin
 */
function Fit(transformations) {
    BaseOperation.call(this, "fit", transformations);
    ResizeFilterMixin.call(this, this.transformations);
}
util.inherits(Fit, BaseOperation);
util.inherits(Fit, ResizeFilterMixin);



module.exports = Fit;