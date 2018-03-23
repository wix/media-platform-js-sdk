import {Source} from '../job/source';
import {Destination} from '../job/destination';

export class CreateArchiveRequest {
  public sources: Source[] = [];
  public destination: Destination | null = null;
  public archiveType: string | null = null;


  /**
   * @param sources
   * @returns {CreateArchiveRequest}
   */
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
   * @param destination
   * @returns {CreateArchiveRequest}
   */
  setDestination(destination: Destination): this {
    this.destination = destination;
    return this;
  }

  /**
   * @param archiveType
   * @returns {CreateArchiveRequest}
   */
  setArchiveType(archiveType: string): this {
    this.archiveType = archiveType;
    return this;
  }
}
