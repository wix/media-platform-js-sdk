import {IInvocation, Invocation} from './invocation';
import {FlowComponent, IFlowComponent} from './flow-component';

export interface IFlowItems {
  [key: string]: FlowComponent;
}

export interface IFlowIItems {
  [key: string]: IFlowComponent;
}

export interface IFlow {
  id: string;
  flow: IFlowIItems;
  invocation: IInvocation;
}

export class Flow {
  public id: string | null = null;
  public invocation: Invocation | null = null;
  public flow: IFlowItems = {};

  constructor(data?: IFlow) {
    if (data) {
      this.deserialize(data);
    }
  }

  /**
   * @param data
   * @private
   */
  deserialize(data: IFlow) {
    this.id = data.id;
    this.invocation = new Invocation(data.invocation);
    for (const i in data.flow) {
      this.flow[i] = new FlowComponent(data.flow[i]);
    }
  }
}

