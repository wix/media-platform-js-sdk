var MediaPlatform = require('./platform/media-platform');
var Image = require('./image/image');
var EncodingOptions = require('./platform/upload/dto/video/encoding-options');

module.exports = {
    
    /**
     * @type {MediaPlatform}
     */
    MediaPlatform: MediaPlatform,
    
    /**
     * @type {Image}
     */
    Image: Image,
    
    /**
     * @type {EncodingOptions}
     */
    EncodingOptions: EncodingOptions
};
