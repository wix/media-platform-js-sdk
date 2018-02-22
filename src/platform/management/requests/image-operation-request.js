/**
 * @param {Source?} source
 * @param {ImageOperationSpecification?} specification
 * @constructor
 */
function ImageOperationRequest(source, specification) {

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
ImageOperationRequest.prototype.setSource = function (source) {
  this.source = source;
  return this;
};

/**
 * @param {ImageOperationSpecification} imageOperationSpecification
 * @returns {ImageOperationRequest}
 */
ImageOperationRequest.prototype.setSpecification = function (imageOperationSpecification) {
  this.specification = imageOperationSpecification;
  return this;
};

/**
 * @type {ImageOperationRequest}
 */
export default ImageOperationRequest;
export {ImageOperationRequest};
