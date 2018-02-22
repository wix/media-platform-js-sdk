/**
 * @constructor
 */

class UploadUrlRequest {
  constructor() {
    /**
     * @type {string}
     */
    this.mimeType = null;

    /**
     * @type {string}
     */
    this.path = null;

    /**
     * @type {number|null}
     */
    this.size = null;

    /**
     * @type {string}
     */
    this.acl = 'public';
  }

  /**
   * @param {string} mimeType
   * @returns {UploadUrlRequest}
   */
  setMimeType(mimeType) {
    this.mimeType = mimeType;
    return this;
  }

  /**
   * @param {string} path
   * @returns {UploadUrlRequest}
   */
  setPath(path) {
    this.path = path;
    return this;
  }

  /**
   * @description Optional file size in bytes. Required for file size enforcement
   * @param {number} size
   * @returns {UploadUrlRequest}
   */
  setSize(size) {
    this.size = size;
    return this;
  }

  /**
   * @param {string} acl
   * @returns {UploadUrlRequest}
   */
  setAcl(acl) {
    this.acl = acl;
    return this;
  }
}

/**
 * @type {UploadUrlRequest}
 */
export default UploadUrlRequest;
export {UploadUrlRequest};
