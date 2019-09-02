import { Destination, IDestination } from '../job/destination';

import { Callback, ICallback } from '../job/callback';
import {
  ExternalAuthorization,
  IExternalAuthorization,
} from './external-authorization';

export interface IImportFileRequest {
  sourceUrl: string | null;
  externalAuthorization?: IExternalAuthorization | null;
  destination: IDestination;
  jobCallback?: ICallback;
}

/**
 * Import File Request
 * @doc ImportFileRequest
 */
export class ImportFileRequest implements IImportFileRequest {
  public sourceUrl: string | null = null;
  public externalAuthorization: ExternalAuthorization | null = null;
  public destination: Destination;
  public jobCallback?: Callback;

  constructor(data: IImportFileRequest) {
    this.sourceUrl = data.sourceUrl;
    this.externalAuthorization = data.externalAuthorization
      ? new ExternalAuthorization(data.externalAuthorization)
      : null;
    this.destination = new Destination(data.destination);
    if (data.jobCallback) {
      this.jobCallback = new Callback(data.jobCallback);
    }
  }
}
