import {Invocation} from '../metadata/invocation';
import {IFlowItems} from '../metadata/flow';
import {FlowComponent} from '../metadata/flow-component';

export interface ICreateFlowRequest {
  invocation: Invocation;
  flow: IFlowItems;
}

export class CreateFlowRequest {
  public invocation: Invocation | null = null;
  public flow: IFlowItems;

  constructor(data?: ICreateFlowRequest) {
    if (data) {
      this.deserialize(data);
    }
  }

  /**
   * @returns {CreateFlowRequest}
   */
  setInvocation(invocation: Invocation): this {
    this.invocation = invocation;
    return this;
  }

  setFlowComponents(flowComponents: IFlowItems): this {
    this.flow = flowComponents;
    return this;
  }

  addFlowComponent(name: string, flowComponent: FlowComponent): this {
    if (!this.flow) {
      this.flow = {};
    }

    this.flow[name] = flowComponent;
    return this;
  }

  deserialize(data: ICreateFlowRequest) {
    this.flow = data.flow;
    this.invocation = data.invocation;
  }
}
