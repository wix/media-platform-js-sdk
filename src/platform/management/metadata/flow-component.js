/**
 * @constructor
 */
function FlowComponent(data) {

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
FlowComponent.prototype.setType = function (type) {
    this.type = type;
    return this;
};

/**
 * @param specification
 * @returns {FlowComponent}
 */
FlowComponent.prototype.setSpecification = function (specification) {
    this.specification = specification;
    return this;
};


/**
 * @param successors
 * @returns {FlowComponent}
 */
FlowComponent.prototype.setSuccessors = function (successors) {
    this.successors = successors;
    return this;
};


/**
 * @param successor
 * @returns {FlowComponent}
 */
FlowComponent.prototype.addSuccessor = function (successor) {
    if(!this.successors) {
        this.successors = [];
    }

    this.successors.push(successor);

    return this;
};

/**
 * @param data
 * @private
 */
FlowComponent.prototype.deserialize = function (data) {
    this.type = data.type;
    this.specification = data.specification;
    this.successors = data.successors;
    this.status = data.status;
};

/**
 * @type {FlowComponent}
 */
module.exports = FlowComponent;



