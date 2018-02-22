/**
 * @constructor
 */

class UploadFileRequest {
  constructor() {
    /**
     * @type {string}
     */
    this.mimeType = 'application/octet-stream';

    /**
     * @type {string}
     */
    this.acl = 'public';
  }

  /**
   * @param {string} mimeType
   * @returns {UploadFileRequest}
   */
  setMimeType(mimeType) {
    this.mimeType = mimeType;
    return this;
  }

  /**
   * @param {string} acl
   * @returns {UploadFileRequest}
   */
  setAcl(acl) {
    this.acl = acl;
    return this;
  }
}

/**
 * @type {UploadFileRequest}
 */
export default UploadFileRequest;
export {UploadFileRequest};
