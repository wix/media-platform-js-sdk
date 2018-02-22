/**
 * @constructor
 */

class ImportFileRequest {
  constructor() {


    /**
     * @type {string}
     */
    this.sourceUrl = null;

    /**
     * @type {ExternalAuthorization}
     */
    this.externalAuthorization = null;

    /**
     * @type {Destination}
     */
    this.destination = null;
  }


  /**
   * @param {string} sourceUrl
   * @returns {ImportFileRequest}
   */
  setSourceUrl(sourceUrl) {

    this.sourceUrl = sourceUrl;
    return this;
  }


  /**
   * @param {ExternalAuthorization} externalAuthorization
   * @returns {ImportFileRequest}
   */
  setExternalAuthorization(externalAuthorization) {

    this.externalAuthorization = externalAuthorization;
    return this;
  }


  /**
   * @param {Destination} destination
   * @returns {ImportFileRequest}
   */
  setDestination(destination) {

    this.destination = destination;
    return this;
  }

}


/**
 * @type {ImportFileRequest}
 */
export {ImportFileRequest};
