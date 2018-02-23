import {Invocation} from './invocation';
import {FlowComponent} from './flow-component';

/**
 * @constructor
 */

class Flow {
  constructor(data) {
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
  deserialize(data) {
    this.id = data.id;
    this.invocation = new Invocation(data.invocation);
    for (const i in data.flow) {
      this.flow[i] = new FlowComponent(data.flow[i]);
    }
  }
}

/**
 * @type {Flow}
 */
export default Flow;
export {Flow};
