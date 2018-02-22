/**
 * @param data
 * @constructor
 */

class PlaybackUrl {
  constructor(data) {


    /**
     *
     * @type {String}
     */
    this.path = null;

    /**
     *
     * @type {String}
     */
    this.packageName = null;

    if (data) {
      this.deserialize(data);
    }
  }


  /**
   * @param data
   * @private
   */
  deserialize(data) {

    this.path = data.path;
    this.packageName = data.packageName;
  }


  /**
   *
   * @param path {String}
   * @returns {PlaybackUrl}
   */
  setPath(path) {

    this.path = path;
    return this;
  }


  /**
   *
   * @param packageName {String}
   * @returns {PlaybackUrl}
   */
  setPackageName(packageName) {

    this.packageName = packageName;
    return this;
  }

}


/**
 * @type {PlaybackUrl}
 */
export default PlaybackUrl;
export {PlaybackUrl};
