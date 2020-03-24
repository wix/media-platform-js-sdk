import { Rectangle } from '../../../geometry/rectangle';

import { Color, IColor } from './color';
import { ExplicitContent, IExplicitContent } from './explicit-content';
import { ILabel, Label } from './label';

export interface IFace {
  width: number;
  height: number;
  x: number;
  y: number;
}

export interface IImageFeatures {
  colors: IColor[];
  explicitContent: IExplicitContent[];
  faces: IFace[];
  labels: ILabel[];
}

export class ImageFeatures implements IImageFeatures {
  public colors: Color[] = [];
  public explicitContent: ExplicitContent[] = [];
  public faces: Rectangle[] = [];
  public labels: Label[] = [];

  constructor(data: IImageFeatures) {
    this.colors = data.colors.map((color) => {
      return new Color(color);
    });

    this.explicitContent = data.explicitContent.map(
      (explicitContent: IExplicitContent) => {
        return new ExplicitContent(explicitContent);
      },
    );

    this.faces = data.faces.map((face) => {
      return new Rectangle(face.width, face.height, face.x, face.y);
    });

    this.labels = data.labels.map((label) => {
      return new Label(label);
    });
  }
}
