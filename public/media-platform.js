var Image = require('../src/image/image');
var Alignments = require('../src/image/operation/align/alignments');

var context = window || global || {};

/**
 * @type {Image}
 */
context.Image = Image;

/**
 * @type {Alignments}
 */
context.Alignments = Alignments;