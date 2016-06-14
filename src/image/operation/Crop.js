var util = require('util');
var BaseOperation = require('./BaseOperation');
var Cropping = require('./crop/Cropping');

/**
 * @summary Crops the image based on the supplied coordinates.
 * @description Starts at the `x`, `y` pixel coordinates along with the width and height parameters.
 * @constructor Crop
 * @extends BaseOperation
 */
function Crop(baseUrl, imageId, imageName, version) {
    BaseOperation.call(this, 'crop', baseUrl, imageId, imageName, version);
    
    this.cropping = new Cropping(this);
    
    this.serializationOrder.push(this.cropping);
}
util.inherits(Crop, BaseOperation);

/**
 * @type {Crop}
 */
module.exports = Crop;