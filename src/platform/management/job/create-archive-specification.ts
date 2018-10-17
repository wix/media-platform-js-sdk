import {Destination} from './destination';
import {ISource, Source} from './source';


export interface ICreateArchiveSpecification {
  sources: ISource[];
  destination: Destination;
  archiveType: string;
}

export class CreateArchiveSpecification implements ICreateArchiveSpecification {
  public sources: Source[];
  public destination: Destination;
  public archiveType: string;

  constructor(data: ICreateArchiveSpecification) {
    this.sources = data.sources.map((source: ISource) => {
      return new Source(source);
    });

    this.destination = data.destination;
    this.archiveType = data.archiveType;
  }
}
