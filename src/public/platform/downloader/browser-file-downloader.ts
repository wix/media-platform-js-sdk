import { DownloadUrl } from '../../../types/files/download-url';
import { RawResponse } from '../../../types/response/response';
import { Configuration } from '../configuration/configuration';
import { HTTPClient } from '../http/browser-http-client';
import { SignedDownloadUrlRequest } from '../../../platform/management/requests/signed-download-url-request';
import { DownloadURLObject } from '../../../types/media-platform/media-platform';

export class FileDownloader {
  constructor(
    public configuration: Configuration,
    public httpClient: HTTPClient,
  ) {}

  /**
   * @param {string} path
   * @param {SignedDownloadUrlRequest?} signedDownloadUrlRequest
   * @returns {Promise<DownloadUrl>>}
   */
  getSignedUrl(
    path: string,
    signedDownloadUrlRequest?: SignedDownloadUrlRequest,
  ): Promise<DownloadURLObject> {
    let params = {
      path,
    };

    if (signedDownloadUrlRequest) {
      params = {
        ...params,
        ...signedDownloadUrlRequest,
      };
    }

    return this.httpClient
      .get<RawResponse<DownloadUrl>>(
        `https://${this.configuration.domain}/_api/download/secure_url`,
        params,
      )
      .then(
        (response) => {
          return response.payload;
        },
        (error) => {
          return Promise.reject(error);
        },
      );
  }
}
