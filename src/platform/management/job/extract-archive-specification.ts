import {ISource, Source} from './source';
import {Destination, IDestination} from './destination';

export interface IExtractArchiveSpecification {
  source: ISource;
  destination: IDestination;
}

export class ExtractArchiveSpecification implements IExtractArchiveSpecification {
  public source: Source;
  public destination: Destination;

  constructor(data: IExtractArchiveSpecification) {
    this.deserialize(data);
  }

  /**
   * @param data
   * @private
   */
  deserialize(data: IExtractArchiveSpecification) {
    this.source = new Source(data.source);
    this.destination = new Destination(data.destination);
  }
}

