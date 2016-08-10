var inherits = require('inherits');
var BaseOperation = require('./base-operation');
var Cropping = require('./crop/cropping');

/**
 * @param baseUrl
 * @param imageId
 * @param imageName
 * @param version
 * @param width
 * @param height
 * @param x
 * @param y
 * @param upscaleFactor
 * @param originalFileData
 * @summary Crops the image starting at the x, y pixel coordinates, along with the width and height options. The image is scaled according to the scale factor parameter before crop.
 * @constructor Crop
 * @extends BaseOperation
 */
function Crop(baseUrl, imageId, imageName, version, width, height, x, y, upscaleFactor, originalFileData) {
    BaseOperation.call(this, 'crop', baseUrl, imageId, imageName, version, width, height, originalFileData);

    /**
     * @type {Cropping}
     */
    var cropping = new Cropping(this);
    cropping.coordinates(x, y, upscaleFactor);
    this.coordinates = (function () {
        return cropping.coordinates;
    })();
    
    this.serializationOrder.push(cropping);
}
inherits(Crop, BaseOperation);

/**
 * @type {Crop}
 */
module.exports = Crop;