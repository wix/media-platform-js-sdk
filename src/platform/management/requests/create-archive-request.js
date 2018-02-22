/**
 * @constructor
 */
function CreateArchiveRequest() {

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
CreateArchiveRequest.prototype.setSources = function (sources) {
  this.sources = sources;
  return this;
};

/**
 * @param {Source} source
 * @returns {CreateArchiveRequest}
 */
CreateArchiveRequest.prototype.addSource = function (source) {
  this.sources.push(source);
  return this;
};

/**
 * @param {Destination} destination
 * @returns {CreateArchiveRequest}
 */
CreateArchiveRequest.prototype.setDestination = function (destination) {
  this.destination = destination;
  return this;
};

/**
 * @param {string} archiveType
 * @returns {CreateArchiveRequest}
 */
CreateArchiveRequest.prototype.setArchiveType = function (archiveType) {
  this.archiveType = archiveType;
  return this;
};

/**
 * @type {CreateArchiveRequest}
 */
export default CreateArchiveRequest;
export {CreateArchiveRequest};
