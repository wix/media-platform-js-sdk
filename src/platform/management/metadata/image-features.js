import {Label} from './label';
import {Color} from './color';
import {Rectangle} from '../../../geometry/rectangle';

/**
 * @constructor
 */

class ImageFeatures {
  constructor(data) {
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
  deserialize(data) {
    this.labels = data.labels.map(function (label) {
      return new Label(label);
    });
    this.faces = data.faces.map(function (face) {
      return new Rectangle(face.width, face.height, face.x, face.y);
    });
    this.colors = data.colors.map(function (color) {
      return new Color(color);
    });
  }
}

/**
 * @type {ImageFeatures}
 */
export default ImageFeatures;
export {ImageFeatures};
