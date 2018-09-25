import {Rectangle} from '../../../geometry/rectangle';

import {Color, IColor} from './color';
import {ILabel, Label} from './label';


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

  constructor(data: IImageFeatures) {
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
