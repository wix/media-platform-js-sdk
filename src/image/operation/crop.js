var util = require('util');
var BaseOperation = require('./base-operation');
var Cropping = require('./crop/cropping');

/**
 * @summary Crops the image starting at the x, y pixel coordinates, along with the width and height options.
 * The image is scaled according to the scale factor parameter before crop.
 * @constructor Crop
 * @extends BaseOperation
 */
function Crop(baseUrl, imageId, imageName, version, width, height) {
    BaseOperation.call(this, 'crop', baseUrl, imageId, imageName, version, width, height);

    /**
     * @type {Cropping}
     */
    var cropping = new Cropping(this);
    this.coordinates = (function () {
        return cropping.coordinates;
    })();

    this.scaleFactor = (function () {
        return cropping.scaleFactor;
    })();
    
    this.serializationOrder.push(cropping);
}
util.inherits(Crop, BaseOperation);

/**
 * @type {Crop}
 */
module.exports = Crop;