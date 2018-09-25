import {Destination, IDestination} from '../job/destination';
import {ISource, Source} from '../job/source';


export interface IExtractArchiveRequest {
  destination: IDestination;
  source: ISource | null;
}

/**
 * Extract Archive Request
 * @doc ExtractArchiveRequest
 */
export class ExtractArchiveRequest implements IExtractArchiveRequest {
  public source: Source | null = null;
  public destination: Destination;

  constructor(data: IExtractArchiveRequest) {
    this.destination = new Destination(data.destination);

    this.source = data.source ? new Source(data.source) : null;
  }
}
