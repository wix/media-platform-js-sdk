import { IFlowIItems, IFlowItems } from '../metadata/flow';
import { FlowComponent } from '../metadata/flow-component';
import { IInvocation, Invocation } from '../metadata/invocation';

export interface ICreateFlowRequest {
  flow: IFlowIItems;
  invocation: IInvocation;
}

export class CreateFlowRequest implements ICreateFlowRequest {
  public flow: IFlowItems;
  public invocation: Invocation;

  constructor(data: ICreateFlowRequest) {
    this.flow = Object.keys(data.flow).reduce(
      (acc, flowKey) => ({
        ...acc,
        [flowKey]: new FlowComponent(data.flow[flowKey]),
      }),
      {},
    );

    this.invocation = new Invocation(data.invocation);
  }
}
