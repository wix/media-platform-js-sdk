/**
 * Attachment
 * @doc DownloadUrlRequest
 */
export interface Attachment {
  filename?: string;
}

/**
 * Download Url Request
 * @doc DownloadUrlRequest
 */
export class DownloadUrlRequest {
  /**
   * @description the token time to live in seconds
   * @type {number}
   */
  public ttl: number = 600;
  /**
   * @description Content-Disposition header, if provided the content disposition is set to attachment with the provided file name
   * @type {{filename: <string>}}
   */
  public attachment: Attachment | null = null;
  /**
   * @description if the token expired, will redirect to this provided url
   * @type {string | null}
   */
  public onExpireRedirectTo: string | null = null;

  /**
   * @param {number} ttl
   * @returns {DownloadUrlRequest}
   */
  setTTL(ttl: number): this {
    this.ttl = ttl;
    return this;
  }

  /**
   * @param {string?} filename
   * @returns {DownloadUrlRequest}
   */
  setAttachment(filename: string): this {
    this.attachment = {};
    if (filename) {
      this.attachment.filename = filename;
    }

    return this;
  }

  /**
   * @param {string} onExpireRedirectTo
   * @returns {DownloadUrlRequest}
   */
  setOnExpireRedirectTo(onExpireRedirectTo: string): this {
    this.onExpireRedirectTo = onExpireRedirectTo;
    return this;
  }
}
