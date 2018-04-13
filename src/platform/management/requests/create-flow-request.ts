import {IInvocation, Invocation} from '../metadata/invocation';
import {IFlowIItems, IFlowItems} from '../metadata/flow';
import {FlowComponent} from '../metadata/flow-component';
import {deprecated} from 'core-decorators';

export interface ICreateFlowRequest {
  invocation: IInvocation;
  flow: IFlowIItems;
}

export class CreateFlowRequest implements ICreateFlowRequest {
  public invocation: Invocation;
  public flow: IFlowItems;

  constructor(data: ICreateFlowRequest) {
    this.deserialize(data);
  }

  /**
   * @deprecated pass data to constructor instead
   * @returns {CreateFlowRequest}
   */
  @deprecated('pass data to constructor instead')
  setInvocation(invocation: Invocation): this {
    this.invocation = invocation;
    return this;
  }

  /**
   * @deprecated pass data to constructor instead
   * @param {IFlowItems} flowComponents
   * @returns {this}
   */
  @deprecated('pass data to constructor instead')
  setFlowComponents(flowComponents: IFlowItems): this {
    this.flow = flowComponents;
    return this;
  }

  /**
   * Add flow component
   * @param {string} name
   * @param {FlowComponent} flowComponent
   * @returns {this}
   */
  addFlowComponent(name: string, flowComponent: FlowComponent): this {
    if (!this.flow) {
      this.flow = {};
    }

    this.flow[name] = flowComponent;
    return this;
  }

  deserialize(data: ICreateFlowRequest) {
    this.flow = Object.keys(data.flow).reduce((acc, flowKey) => {
      return {
        ...acc,
        [flowKey]: new FlowComponent(data.flow[flowKey])
      };
    }, {});
    this.invocation = new Invocation(data.invocation);
  }
}
