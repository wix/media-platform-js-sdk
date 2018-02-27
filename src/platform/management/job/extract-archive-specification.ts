import {ISource, Source} from './source';
import {Destination, IDestination} from './destination';

export interface IExtractArchiveSpecification {
  source: ISource;
  destination: IDestination;
}

export class ExtractArchiveSpecification {
  public source: Source | null = null;
  // TODO: is it a mistake?
  public sources: Source | null = null;
  public destination: Destination | null = null;

  constructor(data?: IExtractArchiveSpecification) {
    if (data) {
      this.deserialize(data);
    }
  }

  /**
   * @param data
   * @private
   */
  deserialize(data: IExtractArchiveSpecification) {
    this.source = this.sources = new Source(data.source);
    this.destination = new Destination(data.destination);
  }
}

