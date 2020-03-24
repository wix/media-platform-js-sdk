import { Token } from '../../../platform/authentication/token';
import {
  IHTTPClient,
  RequestCallback,
} from '../../../platform/http/http-client';
import {
  AuthorizationHeader,
  TokenClaims,
} from '../../../types/media-platform/media-platform';

const isAuthorizationHeaderValid = (
  authorizationHeader: AuthorizationHeader | null,
): authorizationHeader is AuthorizationHeader => {
  let valid = false;
  let tokenString;

  if (authorizationHeader && authorizationHeader.Authorization) {
    // validate the expiration
    let token: TokenClaims | null = null;
    try {
      const parts = authorizationHeader.Authorization.split('.');
      tokenString = window.atob(parts[1]);
      token = JSON.parse(tokenString);
    } catch (error) {
      // tslint:disable-next-line
      console.error('invalid token structure', tokenString);
    }
    if (token !== null && token.exp && token.exp * 1000 > Date.now()) {
      valid = true;
    }
  }

  return valid;
};

export class HTTPClient implements IHTTPClient {
  public authorizationHeader: AuthorizationHeader | null = null;

  constructor(
    public authenticationUrl: string,
    public authenticationHeaders?: Map<string, string>,
  ) {
    this.authenticationUrl = authenticationUrl;
    this.authenticationHeaders = authenticationHeaders;
  }

  private _request(
    httpMethod: string,
    url: string,
    params: any,
    token: Token | undefined,
    callback: RequestCallback,
    noRetry = false,
  ) {
    this.getAuthorizationHeader().then(
      (header) => {
        const request = new XMLHttpRequest();
        let queryString: string = '';
        let body: string = '';

        switch (httpMethod) {
          case 'POST':
          case 'PUT':
            body = JSON.stringify(params);
            break;
          default:
            queryString = '';
            for (const key in params) {
              if (
                typeof params[key] === 'function' ||
                params[key] === null ||
                params[key] === undefined
              ) {
                continue;
              }

              if (queryString !== '') {
                queryString += '&';
              }
              queryString += key + '=' + encodeURIComponent(params[key]);
            }
        }

        request.addEventListener('load', (event) => {
          let payload = null;
          try {
            // TODO: fix, '{}' is temporary solution
            payload = JSON.parse(request.responseText || '{}');
          } catch (error) {
            callback(error, null);
            return;
          }

          if (!(request.status === 200 || request.status === 201)) {
            if (request.status === 401 && !noRetry) {
              this._request(httpMethod, url, params, token, callback, true);
              return;
            }

            callback(payload, null);
            return;
          }

          callback(null, payload);
        });
        request.addEventListener('error', (event) => {
          if (request.status === 403 || request.status === 401) {
            this.authorizationHeader = null;
            if (request.status === 401 && !noRetry) {
              this._request(httpMethod, url, params, token, callback, true);
              return;
            }
          }

          callback(new Error(request.statusText), null);
        });
        request.addEventListener('abort', (event) => {
          callback(new Error(request.statusText), null);
        });

        request.open(httpMethod, queryString ? url + '?' + queryString : url);
        request.withCredentials = true;
        request.setRequestHeader('Accept', 'application/json');
        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader('Authorization', header.Authorization);
        request.send(body);
      },
      (error) => {
        if (callback) {
          callback(error, null);
        }
        return Promise.reject(error);
      },
    );
  }

  getAuthorizationHeader(): Promise<AuthorizationHeader> {
    const authorizationHeader = this.authorizationHeader;

    if (isAuthorizationHeaderValid(authorizationHeader)) {
      return Promise.resolve(authorizationHeader);
    }

    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();

      request.addEventListener('load', () => {
        try {
          // TODO: fix, '{}' is temporary solution
          this.authorizationHeader = JSON.parse(request.responseText || '{}');
        } catch (error) {
          return reject(error);
        }

        return resolve(this.authorizationHeader as AuthorizationHeader);
      });

      request.addEventListener('error', () => {
        reject(new Error(request.statusText));
      });

      request.addEventListener('abort', () => {
        reject(new Error(request.statusText));
      });

      request.open('GET', this.authenticationUrl);
      request.withCredentials = true;
      request.setRequestHeader('Accept', 'application/json');
      if (this.authenticationHeaders) {
        this.authenticationHeaders.forEach((value, key) =>
          request.setRequestHeader(key, value),
        );
      }
      request.send();
    });
  }

  /**
   * @description deletes the cached authorization header
   */
  deauthorize() {
    this.authorizationHeader = null;
  }

  get<T>(url: string, params: object = {}, token?: Token): Promise<T> {
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

  put<T>(url: string, params: object = {}, token?: Token): Promise<T> {
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

  post<T>(url: string, params: object = {}, token?: Token): Promise<T> {
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

  delete<T = void>(
    url: string,
    params: object = {},
    token?: Token,
  ): Promise<T> {
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
        this.getAuthorizationHeader().then(
          (header) => {
            parsedUrl.searchParams.set('Authorization', header.Authorization);
            resolve(parsedUrl.toString());
          },
          (e) => {
            reject(e);
          },
        );
      } catch (e) {
        reject(e);
      }
    });
  }
}
