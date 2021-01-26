import * as request from 'request-promise-native';
import { URL } from 'url';
import axios from 'axios';

import { AuthorizationHeader } from '../../types/media-platform/media-platform';
import { Authenticator } from '../authentication/authenticator';
import { Token } from '../authentication/token';
import { Configuration, IConfiguration } from '../configuration/configuration';
import { UploadFileStream } from '../management/file-uploader';
import { UploadFileRequest } from '../management/requests/upload-file-request';

export class RetriableError extends Error {
  constructor(props: string) {
    super(props);
    Object.setPrototypeOf(this, RetriableError.prototype);
  }
}

interface HTTPRequest {
  method: string;
  url: string;
  headers: AuthorizationHeader;
  resolveWithFullResponse?: boolean;
  json: boolean;
  body?: string;
  qs?: string;
  simple?: boolean;
}

export interface HTTPRequestParams {
  [key: string]: any;
}

export type RequestCallback<T = any> = (
  error: Error | null,
  response: T,
) => void;

export interface IHTTPClient {
  get<T>(
    url: string,
    params?: HTTPRequestParams,
    token?: Token | string,
  ): Promise<T>;

  put<T>(
    url: string,
    params?: HTTPRequestParams,
    token?: Token | string,
  ): Promise<T>;

  post<T>(
    url: string,
    params?: HTTPRequestParams,
    token?: Token | string,
  ): Promise<T>;

  delete<T = void>(
    url: string,
    params?: HTTPRequestParams,
    token?: Token | string,
  ): Promise<T>;

  addAuthToUrl(url): Promise<string>;
}
export class HTTPClient implements IHTTPClient {
  constructor(public authenticator: Authenticator) {}

  private _request<T = any>(
    httpMethod: string,
    url: string,
    params: any,
    token: Token | string | undefined,
  ): Promise<T> {
    const header = this.authenticator.getHeader(token);
    const options: HTTPRequest = {
      method: httpMethod,
      url,
      headers: header,
      json: true,
      resolveWithFullResponse: true,
      simple: false,
    };

    switch (httpMethod) {
      case 'POST':
      case 'PUT':
        options.body = params;
        break;
      default:
        options.qs = params;
    }

    return request(options).then((response) => {
      if (response.statusCode === 502 || response.statusCode === 503) {
        return Promise.reject(
          new RetriableError(JSON.stringify(response.body)),
        );
      }
      if (response.statusCode < 200 || response.statusCode >= 300) {
        return Promise.reject(new Error(JSON.stringify(response.body)));
      }

      return response.body;
    });
  }

  /**
   * @param {string} url
   * @param {{}} form
   * @param {Token?} token
   */
  postForm<T = any>(
    url: string,
    form:
      | FormData
      | ({
          file: UploadFileStream;
          path: string;
          uploadToken: string | null;
        } & Partial<UploadFileRequest>),
    token?: Token | undefined,
  ): Promise<T> {
    const header = this.authenticator.getHeader(token);

    const options = {
      method: 'POST',
      url,
      formData: form,
      headers: header,
      json: true,
    };

    return request(options).then(
      (response) => {
        if (response.statusCode < 200 || response.statusCode >= 300) {
          return Promise.reject(response.body);
        }

        return response;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
  }

  async putFile<T>(
    url: string,
    stream: any,
    params: any,
    headers: any,
  ): Promise<T> {
    const { data } = await axios.put(url, stream, {
      headers,
      responseType: 'json',
      params,
    });
    return data;
  }

  get<T>(
    url: string,
    params: HTTPRequestParams = {},
    token?: Token | string,
  ): Promise<T> {
    return this._request<T>('GET', url, params, token);
  }

  put<T>(
    url: string,
    params: HTTPRequestParams = {},
    token?: Token | string,
  ): Promise<T> {
    return this._request('PUT', url, params, token);
  }

  post<T>(
    url: string,
    params: HTTPRequestParams = {},
    token?: Token | string,
  ): Promise<T> {
    return this._request('POST', url, params, token);
  }

  delete<T = void>(
    url: string,
    params: HTTPRequestParams = {},
    token?: Token | string,
  ): Promise<T> {
    return this._request('DELETE', url, params, token);
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
  const configuration = new Configuration(
    config.domain,
    config.sharedSecret,
    config.appId,
  );
  const authenticator = new Authenticator(configuration);
  return new HTTPClient(authenticator);
};
