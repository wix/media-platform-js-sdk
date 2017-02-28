var Label = require('./label');
var Color = require('./color');
var Rectangle = require('../../../geometry/rectangle');

/**
 * @constructor
 */
function ImageFeatures(data) {

    /**
     * @type {Array<Label>}
     */
    this.labels = null;

    /**
     * @type {Array<Rectangle>}
     */
    this.faces = null;

    /**
     * @type {Array<Color>}
     */
    this.colors = null;

    if (data) {
        this.deserialize(data);
    }
}

/**
 * @param data
 * @private
 */
ImageFeatures.prototype.deserialize = function (data) {
    this.labels = data.labels.map(function (label) {
        return new Label(label)
    });
    this.faces = data.faces.map(function (face) {
        return new Rectangle(face.width, face.height, face.x, face.y)
    });
    this.colors = data.colors.map(function (color) {
        return new Color(color)
    });
};

/**
 * @type {ImageFeatures}
 */
module.exports = ImageFeatures;
