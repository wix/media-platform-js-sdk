export interface ISignedDownloadUrlRequest {
  expirationRedirectUrl?: string;
  expiry?: number;
  saveAs?: string;
}

/**
 * Signed Download Url Request
 * @doc SignedDownloadUrlRequest
 */
export class SignedDownloadUrlRequest {
  /**
   * @description if the token expired, will redirect to this provided url
   * @type {string | null}
   */
  public red: string | null = null;

  /**
   * @description the token time to live in seconds
   * @type {number}
   */
  public expiry: number | null = null;

  /**
   * @description the file name will save as
   * @type {string}
   */
  public saveAs: string = 'true';

  constructor(data: ISignedDownloadUrlRequest) {
    if (data.expirationRedirectUrl) {
      this.red = data.expirationRedirectUrl;
    }

    if (data.expiry) {
      this.expiry = data.expiry;
    }

    if (data.saveAs) {
      this.saveAs = data.saveAs;
    }
  }
}
