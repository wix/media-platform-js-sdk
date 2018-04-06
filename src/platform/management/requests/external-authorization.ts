export interface ExternalAuthorizationHeaders {
  [key: string]: string;
}

export class ExternalAuthorization {
  public headers: ExternalAuthorizationHeaders = {};

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
   * @param headers
   * @returns {ExternalAuthorization}
   */
  setHeaders(headers: ExternalAuthorizationHeaders): this {
    this.headers = headers;
    return this;
  }
}
