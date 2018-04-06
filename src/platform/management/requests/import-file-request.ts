import {Destination} from '../job/destination';
import {ExternalAuthorization} from './external-authorization';

/**
 * Import File Request
 * @doc ImportFileRequest
 */
export class ImportFileRequest {
  public sourceUrl: string | null = null;
  public externalAuthorization: ExternalAuthorization | null = null;
  public destination: Destination | null = null;


  /**
   * @param sourceUrl
   * @returns {ImportFileRequest}
   */
  setSourceUrl(sourceUrl: string): this {
    this.sourceUrl = sourceUrl;
    return this;
  }

  /**
   * @param externalAuthorization
   * @returns {ImportFileRequest}
   */
  setExternalAuthorization(externalAuthorization: ExternalAuthorization): this {
    this.externalAuthorization = externalAuthorization;
    return this;
  }

  /**
   * @param destination
   * @returns {ImportFileRequest}
   */
  setDestination(destination: Destination): this {
    this.destination = destination;
    return this;
  }
}
