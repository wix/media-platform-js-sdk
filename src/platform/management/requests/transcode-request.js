/**
 * @constructor
 */
function TranscodeRequest() {

  /**
   * @type {array}
   */
  this.sources = [];

  /**
   * @type {array}
   */
  this.specifications = [];

}

/**
 * @param {array} sources
 * @returns {TranscodeRequest}
 */
TranscodeRequest.prototype.setSources = function (sources) {
  this.sources = sources;
  return this;
};

/**
 * @param {array} specifications
 * @returns {TranscodeRequest}
 */
TranscodeRequest.prototype.setSpecifications = function (specifications) {
  this.specifications = specifications;
  return this;
};

/**
 * @param {Source} source
 * @returns {TranscodeRequest}
 */
TranscodeRequest.prototype.addSource = function (source) {
  this.sources.push(source);
  return this;
};

/**
 * @param {TranscodeSpecification} specification
 * @returns {TranscodeRequest}
 */
TranscodeRequest.prototype.addSpecification = function (specification) {
  this.specifications.push(specification);
  return this;
};

/**
 * @type {TranscodeRequest}
 */
export default TranscodeRequest;
export {TranscodeRequest};
