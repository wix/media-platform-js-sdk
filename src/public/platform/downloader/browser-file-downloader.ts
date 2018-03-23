import {Configuration} from '../configuration/configuration';
import {HTTPClient} from '../http/browser-http-client';
import {DownloadUrlRequest} from '../../../platform/management/requests/download-url-request';

export class FileDownloader {
  constructor(public configuration: Configuration, public httpClient: HTTPClient) {
  }

  /**
   * @param {string} path
   * @param {DownloadUrlRequest?} downloadUrlRequest
   * @param {function(Error|null, Object)} callback
   */
  getDownloadUrl(path: string, downloadUrlRequest: DownloadUrlRequest | undefined | null, callback: (error: Error | null, payload: any) => void) {
    const params = {
      path: path
    };

    // todo: seems redundant... already handled in the the HttpClient
    if (downloadUrlRequest) {
      for (const key in downloadUrlRequest) {
        if (downloadUrlRequest.hasOwnProperty(key)) {
          if (typeof downloadUrlRequest[key] === 'function' || downloadUrlRequest[key] === null) {
            continue;
          }

          params[key] = downloadUrlRequest[key];
        }
      }
    }

    this.httpClient.request(
      'GET',
      'https://' + this.configuration.domain + '/_api/download/secure_url',
      params,
      undefined,
      function (error, body) {
        if (error) {
          callback(error, null);
          return;
        }

        callback(null, body.payload);
      }
    );
  }
}
