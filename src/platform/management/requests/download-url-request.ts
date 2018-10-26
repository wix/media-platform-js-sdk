export interface IDownloadUrlRequest {
  expirationRedirectUrl?: string;
  expiry?: number;
  saveAs?: string;
}


/**
 * Download Url Request
 * @doc DownloadUrlRequest
 */
export class DownloadUrlRequest {
  /**
   * @description if the token expired, will redirect to this provided url
   * @type {string | null}
   */
  public expirationRedirectUrl: string | undefined;

  /**
   * @description the token time to live in seconds
   * @type {number}
   */
  public expiry: number | undefined;

  /**
   * @description the file name will save as
   * @type {string}
   */
  public saveAs: string = 'true';

  constructor(data: IDownloadUrlRequest) {
    if (data.expirationRedirectUrl) {
      this.expirationRedirectUrl = data.expirationRedirectUrl;
    }

    if (data.expiry) {
      this.expiry = data.expiry;
    }

    if (data.saveAs) {
      this.saveAs = data.saveAs;
    }
  }
}
