import { DownloadURLObject } from '../../types/media-platform/media-platform';
import { Authenticator } from '../authentication/authenticator';
import { NS } from '../authentication/NS';
import { Token } from '../authentication/token';
import { VERB } from '../authentication/VERB';
import { Configuration } from '../configuration/configuration';

import { DownloadUrlRequest } from './requests/download-url-request';

// TODO: add tests
export class FileDownloader {
  /**
   * @param {Configuration} configuration
   * @param {Authenticator} authenticator
   * @constructor
   */
  constructor(
    public configuration: Configuration,
    public authenticator: Authenticator,
  ) {}

  /**
   * @param {string} path
   * @param {DownloadUrlRequest?} downloadUrlRequest
   * @returns {{downloadUrl: string}}
   */
  getDownloadUrl(
    path: string,
    downloadUrlRequest?: DownloadUrlRequest,
  ): DownloadURLObject {
    let payload: { path: string } & Partial<DownloadUrlRequest> = {
      path,
    };

    if (downloadUrlRequest) {
      payload = {
        ...payload,
        ...downloadUrlRequest,
      };
    }

    const token = new Token()
      .setSubject(NS.APPLICATION, this.configuration.appId)
      .setIssuer(NS.APPLICATION, this.configuration.appId)
      .setVerbs([VERB.FILE_DOWNLOAD])
      .setAdditionalClaims({ payload });

    if (downloadUrlRequest && downloadUrlRequest.expiry) {
      token.setExpiration(
        Math.round(new Date().getTime() / 1000) + downloadUrlRequest.expiry,
      );
    }

    const signedToken = this.authenticator.encode(token);

    return {
      downloadUrl: `https://${
        this.configuration.domain
      }/_api/download/file?downloadToken=${signedToken}`,
    };
  }
}
