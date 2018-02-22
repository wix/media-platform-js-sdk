/**
 * @constructor
 */
function ExtractArchiveRequest() {

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
ExtractArchiveRequest.prototype.setSource = function (source) {
  this.source = source;
  return this;
};

/**
 * @param {Destination} destination
 * @returns {ExtractArchiveRequest}
 */
ExtractArchiveRequest.prototype.setDestination = function (destination) {
  this.destination = destination;
  return this;
};

/**
 * @type {CreateArchiveRequest}
 */
export default ExtractArchiveRequest;
export {ExtractArchiveRequest};
