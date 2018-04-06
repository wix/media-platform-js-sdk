import {Source} from '../job/source';
import {ImageOperationSpecification} from '../job/image-operation-specification';


export class ImageOperationRequest {
  constructor(public source: Source | null = null, public specification: ImageOperationSpecification | null = null) {
  }

  /**
   * @param {Source} source
   * @returns {ImageOperationRequest}
   */
  setSource(source: Source): this {
    this.source = source;
    return this;
  }

  /**
   * @param {ImageOperationSpecification} imageOperationSpecification
   * @returns {ImageOperationRequest}
   */
  setSpecification(imageOperationSpecification: ImageOperationSpecification): this {
    this.specification = imageOperationSpecification;
    return this;
  }
}

