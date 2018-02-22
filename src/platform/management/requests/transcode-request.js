/**
 * @constructor
 */

class TranscodeRequest {
  constructor() {


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
  setSources(sources) {

    this.sources = sources;
    return this;
  }


  /**
   * @param {array} specifications
   * @returns {TranscodeRequest}
   */
  setSpecifications(specifications) {

    this.specifications = specifications;
    return this;
  }


  /**
   * @param {Source} source
   * @returns {TranscodeRequest}
   */
  addSource(source) {

    this.sources.push(source);
    return this;
  }


  /**
   * @param {TranscodeSpecification} specification
   * @returns {TranscodeRequest}
   */
  addSpecification(specification) {

    this.specifications.push(specification);
    return this;
  }

}


/**
 * @type {TranscodeRequest}
 */
export default TranscodeRequest;
export {TranscodeRequest};
