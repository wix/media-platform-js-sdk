import { Destination, IDestination } from './destination';

export interface IExtractPosterSpecification {
  second?: number;
  format: string;
  percentage?: number;
  destination: IDestination;
}

export class ExtractPosterSpecification implements IExtractPosterSpecification {
  public destination: Destination;
  public second?: number;
  public format: string;
  public percentage?: number;

  constructor(data: IExtractPosterSpecification) {
    this.destination = new Destination(data.destination);

    this.format = data.format;
    this.second = data.second;
    this.percentage = data.percentage;
  }
}
