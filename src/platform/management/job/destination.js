/**
 * @param data
 * @constructor
 */

class Destination {
  constructor(data) {
    /**
     * @type {string}
     */
    this.path = null;

    /**
     * @type {string}
     */
    this.directory = null;

    /**
     * @type {string}
     */
    this.acl = null;

    if (data) {
      this.deserialize(data);
    }
  }

  /**
   * @param {string} path
   * @returns {Destination}
   */
  setPath(path) {
    this.path = path;
    this.directory = null;
    return this;
  }

  /**
   * @param {string} directory
   * @returns {Destination}
   */
  setDirectory(directory) {
    this.directory = directory;
    this.path = null;
    return this;
  }

  /**
   * @param {string} acl
   * @returns {Destination}
   */
  setAcl(acl) {
    this.acl = acl;
    return this;
  }

  /**
   * @param data
   * @private
   */
  deserialize(data) {
    this.path = data.path;
    this.directory = data.directory;
    this.acl = data.acl;
  }
}

/**
 * @type {Destination}
 */
export default Destination;
export {Destination};
