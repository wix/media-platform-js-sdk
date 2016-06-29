var ImageRequest = require('../src/image/image-request');
var Alignments = require('../src/image/operation/align/alignments');
var MediaType = require('../src/platform/upload/media-type');
var EncodingOptions = require('../src/dto/video/encoding-options');
var ImageDTO = require('../src/dto/image/image-dto');
var AudioDTO = require('../src/dto/audio/audio-dto');
var VideoDTO = require('../src/dto/video/video-dto');
var DocumentDTO = require('../src/dto/document/document-dto');

var context = window || global || {};

/**
 * @type {ImageRequest}
 */
context.ImageRequest = ImageRequest;

/**
 * @type {Alignments}
 */
context.Alignments = Alignments;

/**
 * @type {MediaType}
 */
context.MediaType = MediaType;

/**
 * @type {EncodingOptions}
 */
context.EncodingOptions = EncodingOptions;

/**
 * @type {ImageDTO}
 */
context.ImageDTO = ImageDTO;

/**
 * @type {AudioDTO}
 */
context.AudioDTO = AudioDTO;

/**
 * @type {VideoDTO}
 */
context.VideoDTO = VideoDTO;

/**
 * @type {DocumentDTO}
 */
context.DocumentDTO = DocumentDTO;