import {Destination, IDestination} from './destination';
import {deprecated} from 'core-decorators';

export interface IExtractPosterSpecification {
  second: number;
  format: string;
  destination: IDestination;
}

export class ExtractPosterSpecification implements IExtractPosterSpecification {
  public destination: Destination;
  public second: number;
  public format: string;

  constructor(data: IExtractPosterSpecification) {
    this.deserialize(data);
  }

  @deprecated('pass data to constructor instead')
  public setDestination(destination): this {
    this.destination = destination;
    return this;
  }

  @deprecated('pass data to constructor instead')
  public setFormat(format): this {
    this.format = format;
    return this;
  }

  @deprecated('pass data to constructor instead')
  public setSecond(second): this {
    this.second = second;
    return this;
  }

  private deserialize(data: IExtractPosterSpecification): void {
    this.destination = new Destination(data.destination);
    this.format = data.format;
    this.second = data.second;
  }
}
