import {Source} from '../job/source';
import {Destination} from '../job/destination';

export class ExtractArchiveRequest {
  public source: Source | null = null;
  public destination: Destination | null = null;

  constructor() {
    this.source = null;
    this.destination = null;
  }

  /**
   * @param source
   * @returns {ExtractArchiveRequest}
   */
  setSource(source: Source): this {
    this.source = source;
    return this;
  }

  /**
   * @param destination
   * @returns {ExtractArchiveRequest}
   */
  setDestination(destination: Destination): this {
    this.destination = destination;
    return this;
  }
}
