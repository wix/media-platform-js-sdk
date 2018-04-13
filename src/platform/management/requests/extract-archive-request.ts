import {ISource, Source} from '../job/source';
import {Destination, IDestination} from '../job/destination';
import {deprecated} from 'core-decorators';

export interface IExtractArchiveRequest {
  source: ISource | null;
  destination: IDestination | null;
}

/**
 * Extract Archive Request
 * @doc ExtractArchiveRequest
 */
export class ExtractArchiveRequest implements IExtractArchiveRequest {
  public source: Source | null = null;
  public destination: Destination | null = null;

  constructor(data: IExtractArchiveRequest) {
    this.source = data.source ? new Source(data.source) : null;
    this.destination = data.destination ? new Destination(data.destination) : null;
  }

  /**
   * @deprecated pass data to constructor instead
   * @param source
   * @returns {ExtractArchiveRequest}
   */
  @deprecated('pass data to constructor instead')
  setSource(source: Source): this {
    this.source = source;
    return this;
  }

  /**
   * @deprecated pass data to constructor instead
   * @param destination
   * @returns {ExtractArchiveRequest}
   */
  @deprecated('pass data to constructor instead')
  setDestination(destination: Destination): this {
    this.destination = destination;
    return this;
  }
}
