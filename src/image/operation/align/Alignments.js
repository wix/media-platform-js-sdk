/**
 * Created by elad on 13/06/2016.
 */



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

module.exports = Alignments;