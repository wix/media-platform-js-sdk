import {ISource, Source} from '../job/source';
import {IImageWatermarkSpecification, ImageWatermarkSpecification} from '../job/image-watermark-specification';


export interface IImageWatermarkRequest {
  source: ISource | null;
  specification: IImageWatermarkSpecification | null;
}

export class ImageWatermarkRequest {
  public source: Source | null = null;
  public specification: ImageWatermarkSpecification | null = null;

  constructor({source = null, specification = null}: IImageWatermarkRequest) {
    if (source) {
      this.source = new Source(source);
    }

    if (specification) {
      this.specification = new ImageWatermarkSpecification(specification);
    }
  }
}
