import {Destination, IDestination} from './destination';

export interface IImageOperationSpecification {
  command: string;
  destination: IDestination;
}

export class ImageOperationSpecification {
  public command: string | null = null;
  public destination: Destination | null = null;

  constructor(data?: IImageOperationSpecification) {

    if (data) {
      this.deserialize(data);
    }
  }

  setCommand(command: string): this {
    this.command = command;
    return this;
  }

  setDestination(destination: Destination): this {
    this.destination = destination;
    return this;
  }

  /**
   * @param data
   * @private
   */
  deserialize(data: IImageOperationSpecification) {
    this.command = data.command;
    this.destination = new Destination(data.destination);
  }
}
