var MediaPlatform = require('./platform/media-platform');
var ImageRequest = require('./image/image-request');
var EncodingOptions = require('./dto/video/encoding-options');
var MetadataDTO = require('./dto/metadata-dto');

module.exports = {
    
    /**
     * @type {MediaPlatform}
     */
    MediaPlatform: MediaPlatform,
    
    /**
     * @type {ImageRequest}
     */
    ImageRequest: ImageRequest,
    
    /**
     * @type {EncodingOptions}
     */
    EncodingOptions: EncodingOptions,

    /**
     * @type {MetadataDTO}
     */
    MetadataDTO: MetadataDTO
};
