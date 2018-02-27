import {Successor} from '../../../types/media-platform/media-platform';


export interface IFlowComponent {
  type: string;
  specification: any;
  successors: Successor[];
  status: string;
}

export class FlowComponent {
  public type: string | null = null;
  public specification: any | null = null;
  public successors: Successor[] | null = null;
  public status: string | null = null;

  constructor(data?: IFlowComponent) {
    if (data) {
      this.deserialize(data);
    }
  }

  /**
   * @param type
   * @returns {FlowComponent}
   */
  setType(type: string): this {
    this.type = type;
    return this;
  }

  /**
   * @param specification
   * @returns {FlowComponent}
   */
  setSpecification(specification) {
    this.specification = specification;
    return this;
  }

  /**
   * @param successors
   * @returns {FlowComponent}
   */
  setSuccessors(successors: Successor[]): this {
    this.successors = successors;
    return this;
  }

  /**
   * @param successor
   * @returns {FlowComponent}
   */
  addSuccessor(successor: Successor): this {
    if (!this.successors) {
      this.successors = [];
    }

    this.successors.push(successor);

    return this;
  }

  /**
   * @param data
   * @private
   */
  deserialize(data: IFlowComponent) {
    this.type = data.type;
    this.specification = data.specification;
    this.successors = data.successors;
    this.status = data.status;
  }
}
