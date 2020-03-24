import { Destination, IDestination } from '../job/destination';
import { ISource, Source } from '../job/source';

export interface ICreateArchiveRequest {
  archiveType: string | null;
  destination: IDestination | null;
  sources: ISource[];
}

/**
 * Create Archive Request
 * @doc CreateArchiveRequest
 */
export class CreateArchiveRequest implements ICreateArchiveRequest {
  public sources: Source[] = [];
  public destination: Destination | null = null;
  public archiveType: string | null = null;

  constructor(data: ICreateArchiveRequest) {
    if (!data) {
      throw new Error('No data passed to CreateArchiveRequest constructor');
    }

    this.sources = data.sources.map((sourceData) => new Source(sourceData));
    this.destination = data.destination
      ? new Destination(data.destination)
      : null;
    this.archiveType = data.archiveType;
  }
}
