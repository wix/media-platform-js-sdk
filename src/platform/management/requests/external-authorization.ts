import {deprecated} from 'core-decorators';

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

  /**
   * @param name
   * @param value
   * @returns {ExternalAuthorization}
   */
  addHeader(name: string, value: string): this {
    this.headers[name] = value;
    return this;
  }

  /**
   * @deprecated pass data to constructor instead
   * @param headers
   * @returns {ExternalAuthorization}
   */
  @deprecated('pass data to constructor instead')
  setHeaders(headers: ExternalAuthorizationHeaders): this {
    this.headers = headers;
    return this;
  }
}
