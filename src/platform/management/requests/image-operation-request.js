/**
 * @param {Source?} source
 * @param {ImageOperationSpecification?} specification
 * @constructor
 */

class ImageOperationRequest {
  constructor(source, specification) {
    /**
     * @type {Source}
     */
    this.source = source || null;

    /**
     * @type {ImageOperationSpecification}
     */
    this.specification = specification || null;
  }

  /**
   * @param {Source} source
   * @returns {ImageOperationRequest}
   */
  setSource(source) {
    this.source = source;
    return this;
  }

  /**
   * @param {ImageOperationSpecification} imageOperationSpecification
   * @returns {ImageOperationRequest}
   */
  setSpecification(imageOperationSpecification) {
    this.specification = imageOperationSpecification;
    return this;
  }
}

/**
 * @type {ImageOperationRequest}
 */
export default ImageOperationRequest;
export {ImageOperationRequest};
