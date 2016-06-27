var util = require('util');
var BaseFile = require('./base-file');

/**
 * @param {Object?} data
 * @constructor
 */
function ImageFile(data) {
    BaseFile.call(this);
    
    if (data) {
        this.deserialize(data);
    }

}
util.inherits(ImageFile, BaseFile);

/**
 * @param {Object} data
 * @protected
 */
ImageFile.prototype.deserialize = function (data) {
    ImageFile.super_.prototype.deserialize.call(this, data);
};

/**
 * @type {ImageFile}
 */
module.exports = ImageFile;


//                 {
//                     "status": "READY",
//                     "secure": false,
//                     "format": "jpg",
//                     "url": "media/e66d82_ca6c7b4fc81f45c9bcf219d81395d3ecf000.jpg",
//                     "height": 720,
//                     "width": 1280
//                 }