import {Successor} from '../../../types/media-platform/media-platform';
import {deprecated} from 'core-decorators';


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
    this.deserialize(data);
  }

  /**
   * @deprecated pass data to constructor instead
   * @param type
   * @returns {FlowComponent}
   */
  @deprecated('pass data to constructor instead')
  setType(type: string): this {
    this.type = type;
    return this;
  }

  /**
   * @deprecated pass data to constructor instead
   * @param specification
   * @returns {FlowComponent}
   */
  @deprecated('pass data to constructor instead')
  setSpecification(specification) {
    this.specification = specification;
    return this;
  }

  /**
   * @deprecated pass data to constructor instead
   * @param successors
   * @returns {FlowComponent}
   */
  @deprecated('pass data to constructor instead')
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
    if (data.successors) {
      this.successors = data.successors;
    }
    this.status = data.status ? data.status : null;
  }
}
