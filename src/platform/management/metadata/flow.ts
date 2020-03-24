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
  status?: string | null;
  error?: any;
  operations: IFlowIItems;
  invocation: IInvocation;
}

export class Flow implements IFlow {
  public id: string | null = null;
  public status: string | null = null;
  public error: any;
  public invocation: Invocation;
  public operations: IFlowItems = {};

  constructor(data: IFlow) {
    this.id = data.id;
    this.status = data.status || null;
    this.error = data.error || null;
    this.invocation = new Invocation(data.invocation);

    Object.keys(data.operations).map((key) => {
      this.operations[key] = new FlowComponent(data.operations[key]);
    });
  }
}
