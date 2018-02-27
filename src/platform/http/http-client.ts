import * as request from 'request';
import {Authenticator} from '../authentication/authenticator';
import {AuthorizationHeader} from '../../types/media-platform/media-platform';
import {Token} from '../authentication/token';

// require('request-debug')(request);

interface HTTPRequest {
  method: string;
  url: string;
  headers: AuthorizationHeader;
  json: boolean;
  body?: string;
  qs?: string;
}

export type RequestCallback = (error: Error | null, response: any) => void;

export interface IHTTPClient {
  request(httpMethod: string, url: string, params: any, token: Token | undefined, callback: RequestCallback);
}

export class HTTPClient implements IHTTPClient{
  constructor(public authenticator: Authenticator) {
  }

  /**
   * @param {string} httpMethod
   * @param {string} url
   * @param {Token?} token
   * @param {*?} params
   * @param {function(Error, *)} callback
   */
  request(httpMethod: string, url: string, params: any, token: Token | undefined, callback: RequestCallback) {
    const header = this.authenticator.getHeader(token);

    const options: HTTPRequest = {method: httpMethod, url: url, headers: header, json: true};

    switch (httpMethod) {
      case 'POST':
      case 'PUT':
        options.body = params;
        break;
      default:
        options.qs = params;
    }

    request(
      options,
      function (error, response, body) {
        if (error) {
          callback(error, null);
          return;
        }

        if (response.statusCode < 200 || response.statusCode >= 300) {
          callback(new Error(JSON.stringify(response.body)), null);
          return;
        }
        callback(null, body);
      }.bind(this)
    );
  }

  /**
   * @param {string} url
   * @param {{}} form
   * @param {Token?} token
   * @param {function(Error, *)} callback
   */
  postForm(url: string, form: FormData, token: Token | undefined, callback: RequestCallback) {
    const header = this.authenticator.getHeader(token);

    const options = {method: 'POST', url: url, formData: form, headers: header, json: true};

    request(
      options,
      function (error, response, body) {
        if (error) {
          callback(error, null);
          return;
        }

        if (response.statusCode < 200 || response.statusCode >= 300) {
          callback(new Error(JSON.stringify(response.body)), null);
          return;
        }

        callback(null, body);
      }.bind(this)
    );
  }
}

