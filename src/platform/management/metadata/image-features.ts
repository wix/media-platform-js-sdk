import {ILabel, Label} from './label';
import {Color, IColor} from './color';
import {Rectangle} from '../../../geometry/rectangle';

export interface IFace {
  width: number;
  height: number;
  x: number;
  y: number;
}

export interface IImageFeatures {
  labels: ILabel[];
  faces: IFace[];
  colors: IColor[];
}

export class ImageFeatures implements IImageFeatures {
  public labels: Label[] = [];
  public faces: Rectangle[] = [];
  public colors: Color[] = [];

  constructor(data?: IImageFeatures) {
    if (data) {
      this.deserialize(data);
    }
  }

  /**
   * @param data
   * @private
   */
  deserialize(data: IImageFeatures) {
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
