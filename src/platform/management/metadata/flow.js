var Invocation = require('./invocation');
var FlowComponent = require('./flow-component');
/**
 * @constructor
 */
function Flow(data) {
    this.id = null;

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
 * @param data
 * @private
 */
Flow.prototype.deserialize = function (data) {
    this.id = data.id;
    this.invocation = new Invocation(data.invocation);
    for(var i in data.flow) {
        this.flow[i] = new FlowComponent(data.flow[i]);
    }
};

/**
 * @type {Flow}
 */
module.exports = Flow;



