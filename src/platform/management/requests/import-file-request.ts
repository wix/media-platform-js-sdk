import {Destination, IDestination} from '../job/destination';
import {ExternalAuthorization, IExternalAuthorization} from './external-authorization';
import {deprecated} from 'core-decorators';

export interface IImportFileRequest {
  sourceUrl: string | null;
  externalAuthorization?: IExternalAuthorization | null;
  destination: IDestination | null;
}

/**
 * Import File Request
 * @doc ImportFileRequest
 */
export class ImportFileRequest implements IImportFileRequest {
  public sourceUrl: string | null = null;
  public externalAuthorization: ExternalAuthorization | null = null;
  public destination: Destination | null = null;

  constructor(data: IImportFileRequest) {
    this.sourceUrl = data.sourceUrl;
    this.externalAuthorization = data.externalAuthorization ? new ExternalAuthorization(data.externalAuthorization) : null;
    this.destination = data.destination ? new Destination(data.destination) : null;
  }

  /**
   * @deprecated pass data to constructor instead
   * @param sourceUrl
   * @returns {ImportFileRequest}
   */
  @deprecated('pass data to constructor instead')
  setSourceUrl(sourceUrl: string): this {
    this.sourceUrl = sourceUrl;
    return this;
  }

  /**
   * @deprecated pass data to constructor instead
   * @param externalAuthorization
   * @returns {ImportFileRequest}
   */
  @deprecated('pass data to constructor instead')
  setExternalAuthorization(externalAuthorization: ExternalAuthorization): this {
    this.externalAuthorization = externalAuthorization;
    return this;
  }

  /**
   * @deprecated pass data to constructor instead
   * @param destination
   * @returns {ImportFileRequest}
   */
  @deprecated('pass data to constructor instead')
  setDestination(destination: Destination): this {
    this.destination = destination;
    return this;
  }
}
