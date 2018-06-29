import {ISource, Source} from '../job/source';
import {Destination, IDestination} from '../job/destination';
import {deprecated} from 'core-decorators';

export interface ICreateArchiveRequest {
  sources: ISource[];
  destination: IDestination | null;
  archiveType: string | null;

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
      return;
    }
    this.sources = data.sources.map(sourceData => new Source(sourceData));
    this.destination = data.destination ? new Destination(data.destination) : null;
    this.archiveType = data.archiveType;
  }

  /**
   * @deprecated('pass data to constructor instead')
   * @param sources
   * @returns {CreateArchiveRequest}
   */
  @deprecated('pass data to constructor instead')
  setSources(sources: Source[]): this {
    this.sources = sources;
    return this;
  }

  /**
   * @param source
   * @returns {CreateArchiveRequest}
   */
  addSource(source: Source): this {
    this.sources.push(source);
    return this;
  }

  /**
   * @deprecated('pass data to constructor instead')
   * @param destination
   * @returns {CreateArchiveRequest}
   */
  @deprecated('pass data to constructor instead')
  setDestination(destination: Destination): this {
    this.destination = destination;
    return this;
  }

  /**
   * @deprecated('pass data to constructor instead')
   * @param archiveType
   * @returns {CreateArchiveRequest}
   */
  @deprecated('pass data to constructor instead')
  setArchiveType(archiveType: string): this {
    this.archiveType = archiveType;
    return this;
  }
}
