import {Invocation} from '../metadata/invocation';

/**
 * @constructor
 */

class CreateFlowRequest {
  constructor(data) {
    /**
     * @type {Invocation}
     */
    this.invocation = null;

    /**
     * @type {{}}
     */
    this.flow = {};

    if (data) {
      this.deserialize(data);
    }
  }

  /**
   * @returns {CreateFlowRequest}
   */
  setInvocation(invocation) {
    this.invocation = invocation;
    return this;
  }

  setFlowComponents(flowComponents) {
    this.flow = flowComponents;
    return this;
  }

  addFlowComponent(name, flowComponent) {
    if (!this.flow) {
      this.flow = {};
    }

    this.flow[name] = flowComponent;
    return this;
  }

  deserialize(data) {
    this.flow = data.flow;
    this.invocation = data.invocation;
  }
}

/**
 * @type {CreateFlowRequest}
 */
export default CreateFlowRequest;
export {CreateFlowRequest};
