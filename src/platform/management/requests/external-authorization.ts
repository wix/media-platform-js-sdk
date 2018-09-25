export interface ExternalAuthorizationHeaders {
  [key: string]: string;
}

export interface IExternalAuthorization {
  headers: ExternalAuthorizationHeaders;
}

export class ExternalAuthorization implements IExternalAuthorization {
  public headers: ExternalAuthorizationHeaders = {};

  constructor(data: IExternalAuthorization) {
    this.headers = data.headers;
  }
}
