/**
 * Signed Download Url Request
 * @doc SignedDownloadUrlRequest
 */
export interface SignedDownloadUrlRequest {
  /**
   * @description if the token expired, will redirect to this provided url
   * @type {string}
   */
  expirationRedirectUrl?: string;

  /**
   * @description the token time to live in seconds
   * @type {number}
   */
  expiry?: number;

  /**
   * @description the file name will save as
   * @type {string}
   */
  saveAs: string;
}
