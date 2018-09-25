import {IImageOperationSpecification, ImageOperationSpecification} from '../job/image-operation-specification';
import {ISource, Source} from '../job/source';


export interface IImageOperationRequest {
  source: ISource | null;
  specification: IImageOperationSpecification | null;
}

export class ImageOperationRequest {
  public source: Source | null = null;
  public specification: ImageOperationSpecification | null = null;

  constructor({source = null, specification = null}: IImageOperationRequest) {
    if (source) {
      this.source = new Source(source);
    }

    if (specification) {
      this.specification = new ImageOperationSpecification(specification);
    }
  }
}
