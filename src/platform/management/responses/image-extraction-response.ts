import {Color, IColor} from '../metadata/color';
import { ExplicitContent, IExplicitContent } from '../metadata/explicit-content';
import { Face, IFace } from '../metadata/face';
import { ILabel, Label } from '../metadata/label';


export interface IImageExtractionFace {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface IImageExtractionExplicitContent {
  name: string;
  likelihood: string;
}

export interface IImageExtractionResponse {
  labels?: ILabel[];
  faces?: IImageExtractionFace[];
  colors?: IColor[];
  explicitContent?: IImageExtractionExplicitContent[];
}


export class ImageExtractionResponse {
  public labels: any;
  public faces: any;
  public colors: any;
  public explicitContent: any;

  constructor(data?: IImageExtractionResponse) {
    if (data) {
      this.deserialize(data);
    }
  }

  /**
   * @param data
   * @private
   */
  deserialize(data: IImageExtractionResponse): void {
    if (data.colors && data.colors.length) {
      this.colors = data.colors.map((color: IColor) => new Color(color));
    }

    if (data.labels && data.labels.length) {
      this.labels = data.labels.map((label: ILabel) => new Label(label));
    }

    if (data.faces && data.faces.length) {
      this.faces = data.faces.map((face: IFace) => new Face(face));
    }

    if (data.explicitContent && data.explicitContent.length) {
      this.explicitContent = data.explicitContent.map((explicitContent: IExplicitContent) => new ExplicitContent(explicitContent))
    }
  }
}

