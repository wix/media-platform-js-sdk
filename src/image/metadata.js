/**
 * @param {number} width
 * @param {number} height
 * @param {string} mimeType
 * @constructor
 */
function Metadata(width, height, mimeType) {

  /**
   * @type {number}
   */
  this.width = width;

  /**
   * @type {number}
   */
  this.height = height;

  /**
   * @type {string}
   */
  this.mimeType = mimeType;
}

/**
 * @returns {string}
 */
Metadata.prototype.serialize = function () {
  return 'w_' + this.width + ',h_' + this.height + ',mt_' + encodeURIComponent(this.mimeType);
};

/**
 * @type {Metadata}
 */
export default Metadata;
export {Metadata};
