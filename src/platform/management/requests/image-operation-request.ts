import {ISource, Source} from '../job/source';
import {IImageOperationSpecification, ImageOperationSpecification} from '../job/image-operation-specification';
import {deprecated} from 'core-decorators';


export class ImageOperationRequest {
  public source: Source | null = null;
  public specification: ImageOperationSpecification | null = null;

  constructor(source: ISource | null = null, specification: IImageOperationSpecification | null = null) {
    if (source) {
      this.source = new Source(source);
    }
    if (specification) {
      this.specification = new ImageOperationSpecification(specification);
    }
  }

  /**
   * @deprecated('pass data to constructor instead')
   * @param {Source} source
   * @returns {ImageOperationRequest}
   */
  @deprecated('pass data to constructor instead')
  setSource(source: Source): this {
    this.source = source;
    return this;
  }

  /**
   * @deprecated('pass data to constructor instead')
   * @param {ImageOperationSpecification} imageOperationSpecification
   * @returns {ImageOperationRequest}
   */
  @deprecated('pass data to constructor instead')
  setSpecification(imageOperationSpecification: ImageOperationSpecification): this {
    this.specification = imageOperationSpecification;
    return this;
  }
}

