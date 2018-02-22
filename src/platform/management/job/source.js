/**
 * @param data
 * @constructor
 */

class Source {
  constructor(data) {
    /**
     * @type {string}
     */
    this.fileId = null;

    /**
     * @type {string}
     */
    this.path = null;

    if (data) {
      this.deserialize(data);
    }
  }

  /**
   * @param {string} fileId
   * @returns {Source}
   */
  setFileId(fileId) {
    this.fileId = fileId;
    return this;
  }

  /**
   * @param {string} path
   * @returns {Source}
   */
  setPath(path) {
    this.path = path;
    return this;
  }

  /**
   * @param data
   * @private
   */
  deserialize(data) {
    this.fileId = data.fileId;
    this.path = data.path;
  }
}

/**
 * @type {Source}
 */
export default Source;
export {Source};
