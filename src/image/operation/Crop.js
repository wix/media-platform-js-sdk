/**
 * Created by elad on 06/06/2016.
 */
var util = require('util');
var BaseOperation = require('./BaseOperation');
var Cropping = require('./crop/Cropping');

/**
 * @summary Crops the image based on the supplied coordinates.
 * @description Starts at the `x`, `y` pixel coordinates along with the width and height parameters.
 * @constructor Crop
 * @extends BaseOperation
 */
function Crop() {
    BaseOperation.call(this, 'crop');
    
    this.cropping = new Cropping();
    
    this.serializationOrder.push(this.cropping);
}
util.inherits(Crop, BaseOperation);

/**
 * @type {Crop}
 */
module.exports = Crop;