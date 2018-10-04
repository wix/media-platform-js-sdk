import * as request from 'request-promise-native';
import {URL} from 'url'

import {AuthorizationHeader} from '../../types/media-platform/media-platform';
import {Authenticator} from '../authentication/authenticator';
import {Token} from '../authentication/token';
import {Configuration, IConfiguration} from '../configuration/configuration';
import {UploadFileStream} from '../management/file-uploader';
import {UploadFileRequest} from '../management/requests/upload-file-request';


interface HTTPRequest {
  method: string;
  url: string;
  headers: AuthorizationHeader;
  json: boolean;
  body?: string;
  qs?: string;
}

export interface HTTPRequestParams {
  [key: string]: any;
}

export type RequestCallback<T = any> = (error: Error | null, response: T) => void;

export interface IHTTPClient {
  get<T>(url: string, params?: HTTPRequestParams, token?: Token | string): Promise<T>;

  put<T>(url: string, params?: HTTPRequestParams, token?: Token | string): Promise<T>;

  post<T>(url: string, params?: HTTPRequestParams, token?: Token | string): Promise<T>;

  delete<T = void>(url: string, params?: HTTPRequestParams, token?: Token | string): Promise<T>;

  addAuthToUrl(url): Promise<string>;
}

export class HTTPClient implements IHTTPClient {
  constructor(public authenticator: Authenticator) {
  }

  private _request(httpMethod: string, url: string, params: any, token: Token | string | undefined, callback: RequestCallback) {
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
      (error, response, body) => {
        if (error) {
          callback(error, null);
          return;
        }

        if (response.statusCode < 200 || response.statusCode >= 300) {
          callback(new Error(JSON.stringify(response.body)), null);
          return;
        }
        callback(null, body);
      }
    );

  }

  /**
   * @param {string} url
   * @param {{}} form
   * @param {Token?} token
   */
  postForm<T = any>(url: string, form: FormData | { file: UploadFileStream, path: string, uploadToken: string | null } & Partial<UploadFileRequest>, token?: Token | undefined): Promise<T> {
    const header = this.authenticator.getHeader(token);

    const options = {
      method: 'POST',
      url: url,
      formData: form,
      headers: header,
      json: true
    };

    return request(options)
      .then(
        response => {
          if (response.statusCode < 200 || response.statusCode >= 300) {
            return Promise.reject(response.body);
          }

          return response;
        },
        error => {
          return Promise.reject(error);
        }
      );
  }

  get<T>(url: string, params: HTTPRequestParams = {}, token?: Token | string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this._request('GET', url, params, token, (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  put<T>(url: string, params: HTTPRequestParams = {}, token?: Token | string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this._request('PUT', url, params, token, (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  post<T>(url: string, params: HTTPRequestParams = {}, token?: Token | string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this._request('POST', url, params, token, (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  delete<T = void>(url: string, params: HTTPRequestParams = {}, token?: Token | string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this._request('DELETE', url, params, token, (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  addAuthToUrl(url: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      try {
        const parsedUrl = new URL(url);
        const header = this.authenticator.getHeader();
        parsedUrl.searchParams.set('Authorization', header.Authorization);
        resolve(parsedUrl.toString());
      } catch (e) {
        reject(e);
      }
    });
  }
}

export const createHTTPClient = (config: IConfiguration): HTTPClient => {
  const configuration = new Configuration(config.domain, config.sharedSecret, config.appId);
  const authenticator = new Authenticator(configuration);
  return new HTTPClient(authenticator);
};

