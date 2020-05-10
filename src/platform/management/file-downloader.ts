import { DownloadURLObject } from '../../types/media-platform/media-platform';
import { Authenticator } from '../authentication/authenticator';
import { NS } from '../authentication/NS';
import { Token } from '../authentication/token';
import { VERB } from '../authentication/VERB';
import { Configuration } from '../configuration/configuration';

import { DownloadUrlRequest } from './requests/download-url-request';
import { SignedDownloadUrlRequest } from './requests/signed-download-url-request';

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
   * @deprecated use FileDownloader.getSignedUrl(...)
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
      downloadUrl: `https://${this.configuration.domain}/_api/download/file?downloadToken=${signedToken}`,
    };
  }

  /**
   * @param {string} path
   * @param {SignedDownloadUrlRequest?} signedDownloadUrlRequest
   * @returns {{signedUrl: string}}
   */
  getSignedUrl(
    path: string,
    signedDownloadUrlRequest?: SignedDownloadUrlRequest,
  ): DownloadURLObject {
    const signedToken = this.signToken(path, signedDownloadUrlRequest);
    return this.buildSignedUrl(signedDownloadUrlRequest, path, signedToken);
  }

  private signToken(
    path: string,
    signedDownloadUrlRequest: SignedDownloadUrlRequest | undefined,
  ) {
    let additionalClaims: { path: string; red?: string | null } & Partial<
      SignedDownloadUrlRequest
    > = {
      path,
    };

    if (signedDownloadUrlRequest) {
      additionalClaims = {
        ...additionalClaims,
        ...signedDownloadUrlRequest,
      };
    }

    const token = new Token()
      .setSubject(NS.APPLICATION, this.configuration.appId)
      .setIssuer(NS.APPLICATION, this.configuration.appId)
      .setVerbs([VERB.FILE_DOWNLOAD])
      .setAdditionalClaims(additionalClaims);

    if (signedDownloadUrlRequest && signedDownloadUrlRequest.expiry) {
      token.setExpiration(
        Math.round(new Date().getTime() / 1000) +
          signedDownloadUrlRequest.expiry,
      );
    }

    return this.authenticator.encode(token);
  }

  private buildSignedUrl(
    signedDownloadUrlRequest: SignedDownloadUrlRequest | null = null,
    path: string,
    signedToken: string,
  ) {
    const domain = this.configuration.domain
      .replace(/\.appspot.com/, '.wixmp.com')
      .replace(/\/_api/, '');

    const attachment =
      (signedDownloadUrlRequest?.saveAs &&
        `&filename=${signedDownloadUrlRequest?.saveAs}`) ||
      '';

    return {
      downloadUrl: `https://${domain}${path}?token=${signedToken}${attachment}`,
    };
  }
}
