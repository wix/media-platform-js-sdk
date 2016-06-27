var ImageRequest = require('../src/image/image-request');
var Alignments = require('../src/image/operation/align/alignments');
var MediaType = require('../src/platform/upload/media-type');
var EncodingOptions = require('../src/dto/video/encoding-options');

//TODO: expose MediaType

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