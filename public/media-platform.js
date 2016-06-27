var Image = require('../src/image/image');
var Alignments = require('../src/image/operation/align/alignments');
var MediaType = require('../src/platform/upload/media-type');
var EncodingOptions = require('../src/platform/upload/dto/video/encoding-options');

//TODO: expose MediaType

var context = window || global || {};

/**
 * @type {Image}
 */
context.Image = Image;

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