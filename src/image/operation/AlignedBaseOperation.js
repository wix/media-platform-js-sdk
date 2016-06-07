/**
 * Created by elad on 07/06/2016.
 */
var util = require('util');

var BaseOperation = require('./BaseOperation');

/**
 * @summary Alignments for use with image manipulations
 * @readonly
 * @enum
 */
var Alignments = {
    /**
     * Focuses or aligns on the center of the image, both vertical and horizontal center.
     * @constant
     */
    CENTER: "c",
    /**
     * Focuses or aligns on the top of the image, horizontal center.
     */
    TOP: "t",
    /**
     * Focuses or aligns on top left side of the image.
     */
    TOP_LEFT: "tl",
    /**
     * Focuses or aligns on top right side of the image.
     * @constant
     */
    TOP_RIGHT: "tr",
    /**
     * Focuses or aligns on the bottom of the image, horizontal center.
     */
    BOTTOM: "b",
    /**
     * Focuses or aligns on the bottom left side of the image.
     */
    BOTTOM_LEFT: "bl",
    /**
     * Focuses or aligns on the bottom right side of the image.
     */
    BOTTOM_RIGHT: "br",
    /**
     * Focuses or aligns on the left side of the image, horizontal center.
     */
    LEFT: "l",
    /**
     * Focuses or aligns on the right side of the image, horizontal center.
     */
    RIGHT: "r",
    /**
     * Focus on a face on the image. Detects a face in the picture and centers on it. When multiple faces are detected in the picture, the focus will be on one of them.
     */
    FACE_RECOGNITION: "f",
    /**
     * Focus on all faces in the image. Detects multiple faces and centers on them. Will do a best effort to have all the faces in the new image, depending on the size of the new canvas.     * @constant
     */
    ALL_FACES: "fs"
};

function AlignedBaseOperation(name, transformations) {
    BaseOperation.call(this, name, transformations);
}
util.inherits(AlignedBaseOperation, BaseOperation);

/**
 * @summary Sets the alignment value for this operation
 * @param {Alignments} a the alignment value
 * @returns {AlignedBaseOperation} the operation
 */
AlignedBaseOperation.prototype.alignment = function (a) {
    this.transformations.al = a;
    return this;
};

/**
 * @summary An alias for `alignment`
 * @name al
 * @function
 * @returns {AlignedBaseOperation} the operation
 */
AlignedBaseOperation.prototype.al = AlignedBaseOperation.prototype.alignment;

/**
 * @type {AlignedBaseOperation}
 */
module.exports = AlignedBaseOperation;