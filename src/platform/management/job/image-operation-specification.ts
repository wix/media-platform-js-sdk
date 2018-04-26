import {Destination, IDestination} from './destination';
import {deprecated} from 'core-decorators';

export interface IImageOperationSpecification {
  command: string;
  destination: IDestination;
}

export class ImageOperationSpecification {
  public command: string | null = null;
  public destination: Destination | null = null;

  constructor(data: IImageOperationSpecification) {
    this.deserialize(data);
  }

  /**
   * @deprecated pass data to constructor instead
   * @param {string} command
   * @returns {this}
   */
  @deprecated('pass data to constructor instead')
  public setCommand(command: string): this {
    this.command = command;
    return this;
  }

  /**
   * @deprecated pass data to constructor instead
   * @param {Destination} destination
   * @returns {this}
   */
  @deprecated('pass data to constructor instead')
  public setDestination(destination: Destination): this {
    this.destination = destination;
    return this;
  }

  /**
   * @param data
   * @private
   */
  private deserialize(data: IImageOperationSpecification) {
    this.command = data.command;
    this.destination = new Destination(data.destination);
  }
}
