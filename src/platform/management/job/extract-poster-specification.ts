import {Destination, IDestination} from './destination';

export interface IExtractPosterSpecification {
  second: number;
  format: string;
  destination: IDestination;
}

export class ExtractPosterSpecification implements IExtractPosterSpecification {
  public destination: Destination;
  public second: number;
  public format: string;

  constructor(data?: IExtractPosterSpecification) {
    if (data) {
      this.deserialize(data);
    }
  }

  public setDestination(destination): this {
    this.destination = destination;
    return this;
  };

  public setFormat(format): this {
    this.format = format;
    return this;
  };

  public setSecond(second): this {
    this.second = second;
    return this;
  };

  private deserialize(data: IExtractPosterSpecification): void {
    this.destination = new Destination(data.destination);
    this.format = data.format;
    this.second = data.second;
  };

}
