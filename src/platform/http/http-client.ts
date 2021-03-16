import { URL } from 'url';
import axios, { Method as HttpMethod } from 'axios';

import AxiosRetry, { isRetryableError, isNetworkError} from 'axios-retry';
const axiosRetry: typeof AxiosRetry = require('axios-retry');

import { AuthorizationHeader } from '../../types/media-platform/media-platform';
import { Authenticator } from '../authentication/authenticator';
import { Token } from '../authentication/token';
import { Configuration, IConfiguration } from '../configuration/configuration';
import { UploadFileStream } from '../management/file-uploader';
import { UploadFileRequest } from '../management/requests/upload-file-request';

interface HTTPRequest {
  method: HttpMethod;
  url: string;
  headers: AuthorizationHeader;
  data?: any;
  params?: object;
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
  constructor(public authenticator: Authenticator) {
    axiosRetry(axios, { retryCondition: (e) => isNetworkError(e) || isRetryableError(e) });
  }

  private async _request<T = any>(
    httpMethod: HttpMethod,
    url: string,
    params: HTTPRequestParams,
    token: Token | string | undefined,
  ): Promise<T> {
    const header = this.authenticator.getHeader(token);
    const options: HTTPRequest = {
      method: httpMethod,
      url,
      headers: header,
    };

    switch (httpMethod) {
      case 'POST':
      case 'PUT':
        options.data = params;
        break;
      default:
        options.params = params;
    }

    return axios(options)
      .then(result => result.data)
      .catch(err => {
        throw new Error(JSON.stringify(err.response?.data));
      });
  }

  /**
   * @param {string} url
   * @param {{}} form
   * @param {Token?} token
   */
  async postForm<T = any>(
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
      method: 'POST' as HttpMethod,
      url,
      data: form,
      headers: header,
    };

    return axios(options)
      .then(result => result.data)
      .catch(err => {
        throw new Error(JSON.stringify(err.response?.data));
      });
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
