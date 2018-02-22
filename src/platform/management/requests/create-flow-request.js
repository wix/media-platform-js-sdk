import {Invocation} from '../metadata/invocation';


/**
 * @constructor
 */
function CreateFlowRequest(data) {

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
CreateFlowRequest.prototype.setInvocation = function (invocation) {
  this.invocation = invocation;
  return this;
};

CreateFlowRequest.prototype.setFlowComponents = function (flowComponents) {
  this.flow = flowComponents;
  return this;
};

CreateFlowRequest.prototype.addFlowComponent = function (name, flowComponent) {
  if (!this.flow) {
    this.flow = {};
  }

  this.flow[name] = flowComponent;
  return this;
};

CreateFlowRequest.prototype.deserialize = function (data) {
  this.flow = data.flow;
  this.invocation = data.invocation;
};

/**
 * @type {CreateFlowRequest}
 */
export default CreateFlowRequest;
export {CreateFlowRequest};
