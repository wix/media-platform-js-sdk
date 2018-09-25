import {Color, IColor} from '../metadata/color';
import {ExplicitContent, IExplicitContent} from '../metadata/explicit-content';
import {Face, IFace} from '../metadata/face';
import {ILabel, Label} from '../metadata/label';


export interface ImageExtractionResponse {
  labels?: ILabel[];
  faces?: IFace[];
  colors?: IColor[];
  explicitContent?: IExplicitContent[];
}

export class ImageExtraction {
  public labels?: ILabel[];
  public faces?: IFace[];
  public colors?: IColor[];
  public explicitContent?: IExplicitContent[];

  constructor(data: ImageExtractionResponse) {
    if (data.colors && data.colors.length) {
      this.colors = data.colors.map((color: IColor) => new Color(color));
    }

    if (data.labels && data.labels.length) {
      this.labels = data.labels.map((label: ILabel) => new Label(label));
    }

    if (data.faces && data.faces.length) {
      this.faces = data.faces.map((face: IFace) => new Face(face.height, face.width, face.x, face.y));
    }

    if (data.explicitContent && data.explicitContent.length) {
      this.explicitContent = data.explicitContent.map((explicitContent: IExplicitContent) => new ExplicitContent(explicitContent))
    }
  }
}
