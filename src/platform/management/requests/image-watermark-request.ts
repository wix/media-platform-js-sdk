import { ISource } from '../job/source';
import { IImageWatermarkSpecification } from '../job/image-watermark-specification';

export interface IImageWatermarkRequest {
  source: ISource | null;
  specification: IImageWatermarkSpecification | null;
}
