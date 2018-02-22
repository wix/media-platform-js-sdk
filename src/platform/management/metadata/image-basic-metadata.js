/**
 * @constructor
 */

class ImageBasicMetadata {
  constructor(data) {
    /**
     * @type {string}
     */
    this.height = null;

    /**
     * @type {string}
     */
    this.width = null;

    /**
     * @type {string}
     */
    this.colorspace = null;

    /**
     * @type {string}
     */
    this.format = null;

    if (data) {
      this.deserialize(data);
    }
  }

  /**
   * @param data
   * @private
   */
  deserialize(data) {
    this.height = data.height;
    this.width = data.width;
    this.colorspace = data.colorspace;
    this.format = data.format;
  }
}

/**
 * @type {ImageBasicMetadata}
 */
export default ImageBasicMetadata;
export {ImageBasicMetadata};
