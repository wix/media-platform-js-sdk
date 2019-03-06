import { FlowComponent, IFlowComponent } from './flow-component';
import { IInvocation, Invocation } from './invocation';

export interface IFlowItems {
  [key: string]: FlowComponent;
}

export interface IFlowIItems {
  [key: string]: IFlowComponent;
}

export interface IFlow {
  id: string | null;
  flow: IFlowIItems;
  invocation: IInvocation;
}

export class Flow implements IFlow {
  public id: string | null = null;
  public invocation: Invocation;
  public flow: IFlowItems = {};

  constructor(data: IFlow) {
    this.id = data.id;
    this.invocation = new Invocation(data.invocation);

    for (const i in data.flow) {
      this.flow[i] = new FlowComponent(data.flow[i]);
    }
  }
}
