/**
 * @param data
 * @constructor
 */
function Source(data) {

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
Source.prototype.setFileId = function (fileId) {
  this.fileId = fileId;
  return this;
};

/**
 * @param {string} path
 * @returns {Source}
 */
Source.prototype.setPath = function (path) {
  this.path = path;
  return this;
};

/**
 * @param data
 * @private
 */
Source.prototype.deserialize = function (data) {
  this.fileId = data.fileId;
  this.path = data.path;
};

/**
 * @type {Source}
 */
export default Source;
export {Source};
