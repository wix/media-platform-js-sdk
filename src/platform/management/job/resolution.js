/**
 * @param data
 * @constructor
 */

class Resolution {
  constructor(data) {


    /**
     * @type {number}
     */
    this.width = null;

    /**
     * @type {number}
     */
    this.height = null;

    if (data) {
      this.deserialize(data);
    }
  }


  /**
   * @param data
   * @private
   */
  deserialize(data) {

    this.width = data.width;
    this.height = data.height;
  }

}


/**
 * @type {Resolution}
 */
export default Resolution;
export {Resolution};
