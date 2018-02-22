/**
 * @constructor
 */

class DownloadUrlRequest {
  constructor() {


    /**
     * @description the token time to live in seconds
     * @type {number}
     */
    this.ttl = 600;

    /**
     * @description Content-Disposition header, if provided the content disposition is set to attachment with the provided file name
     * @type {{filename: <string>}}
     */
    this.attachment = null;

    /**
     * @description if the token expired, will redirect to this provided url
     * @type {string | null}
     */
    this.onExpireRedirectTo = null;
  }


  /**
   * @param {number} ttl
   * @returns {DownloadUrlRequest}
   */
  setTTL(ttl) {

    this.ttl = ttl;
    return this;
  }


  /**
   * @param {string?} filename
   * @returns {DownloadUrlRequest}
   */
  setAttachment(filename) {

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
  setOnExpireRedirectTo(onExpireRedirectTo) {

    this.onExpireRedirectTo = onExpireRedirectTo;
    return this;
  }

}


/**
 * @type {DownloadUrlRequest}
 */
export default DownloadUrlRequest;
export {DownloadUrlRequest};
