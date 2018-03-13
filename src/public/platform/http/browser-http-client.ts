import {AuthorizationHeader} from '../../../types/media-platform/media-platform';
import {IHTTPClient, RequestCallback} from '../../../platform/http/http-client';
import {Token} from '../../../platform/authentication/token';


export class HTTPClient implements IHTTPClient {
  public authorizationHeader: AuthorizationHeader | null = null;

  constructor(public authenticationUrl: string) {
    this.authenticationUrl = authenticationUrl;
  }

  /**
   * @param {string} httpMethod
   * @param {string} url
   * @param {{}} params
   * @param {string?} token
   * @param {function(Error, *)} callback
   * @param noRetry
   */
  request(httpMethod: string, url: string, params: any, token: Token | undefined, callback: RequestCallback, noRetry = false) {
    this.getAuthorizationHeader(
      function (error, header) {
        if (error) {
          callback(error, null);
          return;
        }
        const request = new XMLHttpRequest();
        let queryString = null;
        let body = null;
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
      }
    );
  }

  /**
   * @param {function(Error, string|null)} callback
   */
  getAuthorizationHeader(callback) {
    if (this.isAuthorizationHeaderValid()) {
      callback(null, this.authorizationHeader);
    } else {
      const request = new XMLHttpRequest();

      request.addEventListener(
        'load',
        (event) => {
          try {
            this.authorizationHeader = JSON.parse(request.responseText);
          } catch (error) {
            callback(error, null);
            return;
          }
          callback(null, this.authorizationHeader);
        }
      );
      request.addEventListener(
        'error',
        (event) => {
          callback(new Error(request.statusText), null);
        }
      );
      request.addEventListener(
        'abort',
        (event) => {
          callback(new Error(request.statusText), null);
        }
      );

      request.open('GET', this.authenticationUrl);
      request.withCredentials = true;
      request.setRequestHeader('Accept', 'application/json');
      request.send();
    }
  }

  /**
   * @description deletes the cached authorization header
   */
  deauthorize() {
    this.authorizationHeader = null;
  }

  isAuthorizationHeaderValid() {
    let valid = false;
    let tokenString;

    if (this.authorizationHeader && this.authorizationHeader.Authorization) {
      // validate the expiration
      let token = null;
      try {
        const parts = this.authorizationHeader.Authorization.split('.');
        tokenString = window.atob(parts[1]);
        token = JSON.parse(tokenString);
      } catch (error) {
        console.error('invalid token structure', tokenString);
      }
      if (token && token.exp && token.exp * 1000 > Date.now()) {
        valid = true;
      }
    }

    return valid;
  }

  get<T>(url: string, params: object = {}, token?: Token): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.request('GET', url, params, token, (error, response) => {
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
      this.request('PUT', url, params, token, (error, response) => {
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
      this.request('POST', url, params, token, (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }
}
