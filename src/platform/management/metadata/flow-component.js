/**
 * @constructor
 */

class FlowComponent {
  constructor(data) {
    /**
     * @type {string}
     */
    this.type = null;

    /**
     * @type {{}}
     */
    this.specification = null;

    /**
     * @type {string}
     */
    this.successors = null;

    /**
     * @type {string}
     */
    this.status = null;

    if (data) {
      this.deserialize(data);
    }
  }

  /**
   * @param type
   * @returns {FlowComponent}
   */
  setType(type) {
    this.type = type;
    return this;
  }

  /**
   * @param specification
   * @returns {FlowComponent}
   */
  setSpecification(specification) {
    this.specification = specification;
    return this;
  }

  /**
   * @param successors
   * @returns {FlowComponent}
   */
  setSuccessors(successors) {
    this.successors = successors;
    return this;
  }

  /**
   * @param successor
   * @returns {FlowComponent}
   */
  addSuccessor(successor) {
    if (!this.successors) {
      this.successors = [];
    }

    this.successors.push(successor);

    return this;
  }

  /**
   * @param data
   * @private
   */
  deserialize(data) {
    this.type = data.type;
    this.specification = data.specification;
    this.successors = data.successors;
    this.status = data.status;
  }
}

/**
 * @type {FlowComponent}
 */
export default FlowComponent;
export {FlowComponent};
