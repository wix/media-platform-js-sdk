import {Configuration} from '../configuration/configuration';
import {HTTPClient} from '../http/browser-http-client';
import {DownloadUrlRequest} from '../../../platform/management/requests/download-url-request';
import {RawResponse} from '../../../types/response/response';
import {deprecatedFn} from '../../../utils/deprecated/deprecated';

export class FileDownloader {
  constructor(public configuration: Configuration, public httpClient: HTTPClient) {
  }

  /**
   * @param {string} path
   * @param {DownloadUrlRequest?} downloadUrlRequest
   * @param {function(Error|null, Object)} callback DEPRECATED! use promise response instead
   */
  getDownloadUrl(path: string, downloadUrlRequest: DownloadUrlRequest | undefined | null, callback?: (error: Error | null, payload: DownloadUrl | null) => void): Promise<DownloadUrl> {
    const params = {
      path
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
    if (callback) {
      callback = deprecatedFn('FileDownloader.getDownloadUrl. Use promise response instead')(callback);
    }

    return this.httpClient
      .get<RawResponse<DownloadUrl>>(`https://${this.configuration.domain}/_api/download/secure_url`, params)
      .then(response => {
        if (callback) {
          callback(null, response.payload);
        }
        return response.payload;
      }, error => {
        if (callback) {
          callback(error, null);
        }
        return Promise.reject(error);
      });
  }
}
