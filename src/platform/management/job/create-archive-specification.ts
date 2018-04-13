import {ISource, Source} from './source';
import {Destination, IDestination} from './destination';

export interface ICreateArchiveSpecification {
  sources: ISource[];
  destination: IDestination;
  archiveType: string;
}

export class CreateArchiveSpecification implements ICreateArchiveSpecification {
  public sources: Source[];
  public destination: Destination;
  public archiveType: string;

  constructor(data: ICreateArchiveSpecification) {
    this.deserialize(data);
  }

  /**
   * @param data
   * @private
   */
  deserialize(data: ICreateArchiveSpecification) {
    this.sources = data.sources.map(function (source) {
      return new Source(source);
    });
    this.destination = new Destination(data.destination);
    this.archiveType = data.archiveType;
  }
}

