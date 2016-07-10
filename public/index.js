var MediaPlatform = require('./platform/media-platform');
var MediaType = require('../src/dto/media-type');
var ImageDTO = require('../src/dto/image/image-dto');
var ImageRequest = require('../src/image/image-request');
var Alignments = require('../src/image/operation/align/alignments');
var EncodingOptions = require('../src/dto/video/encoding-options');

var MP = (window || global || {}).MP = {};

/**
 * @type {MediaPlatform}
 */
MP.MediaPlatform = MediaPlatform;

/**
 * @type {MediaType}
 */
MP.MediaType = MediaType;

MP.image = {
    /**
     * @type {ImageRequest}
     */
    ImageRequest: ImageRequest,

    /**
     * @type {Alignments}
     */
    Alignments: Alignments,
    
    /**
     * @type {ImageDTO}
     */
    ImageDTO: ImageDTO
};

MP.video = {
    /**
     * @type {EncodingOptions}
     */
    EncodingOptions: EncodingOptions
};