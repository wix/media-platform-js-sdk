/**
 * Created by elad on 06/06/2016.
 */
var util = require('util');
var AlignedBaseOperation = require('./AlignedBaseOperation');
var ResizeFilterMixin = require('../mixin/ResizeFilterMixin');

/**
 * @summary Create an image with the exact given width and height while retaining original proportions.
 * @description Uses only part of the image that fills the given dimensions. Only part of the original image
 * might be visible if the required proportions are different than the original ones.
 * @constructor Fill
 * @mixes BaseOperation
 */
function Fill(transformations) {
    AlignedBaseOperation.call(this, "fill", transformations);
    ResizeFilterMixin.call(this, this.transformations);
}
util.inherits(Fill, AlignedBaseOperation);
util.inherits(Fill, ResizeFilterMixin);

module.exports = Fill;