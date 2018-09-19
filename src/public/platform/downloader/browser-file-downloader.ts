import {DownloadUrlRequest} from '../../../platform/management/requests/download-url-request';
import {DownloadUrl} from '../../../types/files/download-url';
import {RawResponse} from '../../../types/response/response';
import {Configuration} from '../configuration/configuration';
import {HTTPClient} from '../http/browser-http-client';


export class FileDownloader {
  constructor(public configuration: Configuration, public httpClient: HTTPClient) {
  }

  /**
   * @param {string} path
   * @param {DownloadUrlRequest?} downloadUrlRequest
   * @returns {Promise<DownloadUrl>>}
   */
  getDownloadUrl(path: string, downloadUrlRequest?: DownloadUrlRequest): Promise<DownloadUrl> {
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

    return this.httpClient
      .get<RawResponse<DownloadUrl>>(`https://${this.configuration.domain}/_api/download/secure_url`, params)
      .then(response => {
        return response.payload;
      }, error => {
        return Promise.reject(error);
      });
  }
}
