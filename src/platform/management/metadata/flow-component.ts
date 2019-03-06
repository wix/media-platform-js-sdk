import { Successor } from '../../../types/media-platform/media-platform';

export interface IFlowComponent {
  type: string;
  specification: any;
  successors?: Successor[];
  status?: string | null;
}

export class FlowComponent implements IFlowComponent {
  public type: string;
  public specification: any | null = null;
  public successors: Successor[] = [];
  public status: string | null = null;

  constructor(data: IFlowComponent) {
    this.type = data.type;
    this.specification = data.specification;

    if (data.successors) {
      this.successors = data.successors;
    }

    this.status = data.status ? data.status : null;
  }
}
