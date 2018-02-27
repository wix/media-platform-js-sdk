import {ISource, Source} from './source';
import {Destination, IDestination} from './destination';

export interface ICreateArchiveSpecification {
  sources: ISource[];
  destination: IDestination;
  archiveType: string;
}

export class CreateArchiveSpecification {
  public sources: Source[] | null = null;
  public destination: Destination | null = null;
  public archiveType: string | null = null;

  constructor(data?: ICreateArchiveSpecification) {
    if (data) {
      this.deserialize(data);
    }
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

