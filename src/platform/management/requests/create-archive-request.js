/**
 * @constructor
 */

class CreateArchiveRequest {
  constructor() {
    /**
     * @type {array}
     */
    this.sources = [];

    /**
     * @type {Destination}
     */
    this.destination = null;

    /**
     * @type {string}
     */
    this.archiveType = null;
  }

  /**
   * @param {array} sources
   * @returns {CreateArchiveRequest}
   */
  setSources(sources) {
    this.sources = sources;
    return this;
  }

  /**
   * @param {Source} source
   * @returns {CreateArchiveRequest}
   */
  addSource(source) {
    this.sources.push(source);
    return this;
  }

  /**
   * @param {Destination} destination
   * @returns {CreateArchiveRequest}
   */
  setDestination(destination) {
    this.destination = destination;
    return this;
  }

  /**
   * @param {string} archiveType
   * @returns {CreateArchiveRequest}
   */
  setArchiveType(archiveType) {
    this.archiveType = archiveType;
    return this;
  }
}

/**
 * @type {CreateArchiveRequest}
 */
export default CreateArchiveRequest;
export {CreateArchiveRequest};
