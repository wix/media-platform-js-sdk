/**
 * @constructor
 */

class ExtractArchiveRequest {
  constructor() {


    /**
     * @type {Source}
     */
    this.source = null;

    /**
     * @type {Destination}
     */
    this.destination = null;
  }


  /**
   * @param {Source} source
   * @returns {ExtractArchiveRequest}
   */
  setSource(source) {

    this.source = source;
    return this;
  }


  /**
   * @param {Destination} destination
   * @returns {ExtractArchiveRequest}
   */
  setDestination(destination) {

    this.destination = destination;
    return this;
  }

}


/**
 * @type {CreateArchiveRequest}
 */
export default ExtractArchiveRequest;
export {ExtractArchiveRequest};
