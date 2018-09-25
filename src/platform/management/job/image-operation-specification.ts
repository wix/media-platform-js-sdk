import {Destination, IDestination} from './destination';


export interface IImageOperationSpecification {
  command: string;
  destination: IDestination;
}

export class ImageOperationSpecification {
  public command: string | null = null;
  public destination: Destination | null = null;

  constructor(data: IImageOperationSpecification) {
    this.command = data.command;
    this.destination = new Destination(data.destination);
  }
}
