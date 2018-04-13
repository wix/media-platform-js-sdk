import {AuthorizationHeader, TokenClaims} from '../../../types/media-platform/media-platform';
import {IHTTPClient, RequestCallback} from '../../../platform/http/http-client';
import {Token} from '../../../platform/authentication/token';
import {deprecatedFn} from '../../../utils/deprecated/deprecated';
import {deprecated} from 'core-decorators';

const isAuthorizationHeaderValid = (authorizationHeader: AuthorizationHeader | null): authorizationHeader is AuthorizationHeader => {
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

  constructor(public authenticationUrl: string) {
    this.authenticationUrl = authenticationUrl;
  }

  private _request(httpMethod: string, url: string, params: any, token: Token | undefined, callback: RequestCallback, noRetry = false) {
    this.getAuthorizationHeader()
      .then(
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
                if (typeof params[key] === 'function' || params[key] === null) {
                  continue;
                }

                if (queryString !== '') {
                  queryString += '&';
                }
                queryString += key + '=' + encodeURIComponent(params[key]);
              }
          }

          request.addEventListener(
            'load',
            (event) => {
              let payload = null;
              try {
                payload = JSON.parse(request.responseText);
              } catch (error) {
                callback(error, null);
                return;
              }

              if (!(request.status === 200 || request.status === 201)) {
                if (request.status === 401) {
                  if (!noRetry) {
                    this.request(httpMethod, url, params, token, callback, true);
                    return;
                  }
                }

                callback(payload, null);
                return;
              }

              callback(null, payload);
            }
          );
          request.addEventListener(
            'error',
            (event) => {
              if (request.status === 403 || request.status === 401) {
                this.authorizationHeader = null;
                if (request.status === 401 && !noRetry) {
                  this.request(httpMethod, url, params, token, callback, true);
                  return;
                }
              }

              callback(new Error(request.statusText), null);
            }
          );
          request.addEventListener(
            'abort',
            (event) => {
              callback(new Error(request.statusText), null);
            }
          );

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
        }
      );
  }

  /**
   * @deprecated use one of get/post/put methods
   * @param {string} httpMethod
   * @param {string} url
   * @param {{}} params
   * @param {string?} token
   * @param {function(Error, *)} callback
   * @param noRetry
   */
  @deprecated('use one of get/post/put methods')
  request(httpMethod: string, url: string, params: any, token: Token | undefined, callback: RequestCallback, noRetry = false) {
    this._request(httpMethod, url, params, token, callback, noRetry);
  }

  /**
   * @param {function(Error, string|null)} callback DEPRECATED: use promise response instead
   */
  getAuthorizationHeader(callback?: (error: Error | null, authorization: AuthorizationHeader | null) => void): Promise<AuthorizationHeader> {
    const authorizationHeader = this.authorizationHeader;
    if (callback) {
      callback = deprecatedFn('HttpClient.getAuthorizationHeader. Use promise response instead')(callback);
    }
    if (isAuthorizationHeaderValid(authorizationHeader)) {
      if (callback) {
        callback(null, authorizationHeader);
      }
      return Promise.resolve(authorizationHeader);
    }
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();

      request.addEventListener(
        'load',
        (event) => {
          try {
            this.authorizationHeader = JSON.parse(request.responseText);
          } catch (error) {
            if (callback) {
              callback(error, null);
            }
            return reject(error);
          }
          if (callback) {
            callback(null, this.authorizationHeader);
          }
          return resolve(this.authorizationHeader as AuthorizationHeader);
        }
      );
      request.addEventListener(
        'error',
        (event) => {
          const error = new Error(request.statusText);
          if (callback) {
            callback(error, null);
          }
          reject(error);
        }
      );
      request.addEventListener(
        'abort',
        (event) => {
          const error = new Error(request.statusText);
          if (callback) {
            callback(error, null);
          }
          reject(error);
        }
      );

      request.open('GET', this.authenticationUrl);
      request.withCredentials = true;
      request.setRequestHeader('Accept', 'application/json');
      request.send();
    });
  }


  /**
   * @description deletes the cached authorization header
   */
  deauthorize() {
    this.authorizationHeader = null;
  }

  get<T>(url: string, params: object = {}, token ?: Token): Promise<T> {
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

  put<T>(url: string, params: object = {}, token ?: Token): Promise<T> {
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

  post<T>(url: string, params: object = {}, token ?: Token): Promise<T> {
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

  delete<T = void>(url: string, params: object = {}, token ?: Token): Promise<T> {
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
}
