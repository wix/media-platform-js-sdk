var Invocation = require('../metadata/invocation');


/**
 * @constructor
 */
function CreateFlowRequest() {

    /**
     * @type {Invocation}
     */
    this.invocation = null;

    /**
     * @type {{}}
     */
    this.flow = {};
}

/**
 * @returns {CreateFlowRequest}
 */
CreateFlowRequest.prototype.setInvocation = function (invocation) {
    this.invocation = invocation;
    return this;
};

CreateFlowRequest.prototype.setFlowComponents = function(flowComponents) {
    this.flow = flowComponents;
    return this;
};

CreateFlowRequest.prototype.addFlowComponent = function(name, flowComponent) {
    if(!this.flow) {
        this.flow = {};
    }

    this.flow[name] = flowComponent;
    return this;
};

/**
 * @type {CreateFlowRequest}
 */
module.exports = CreateFlowRequest;