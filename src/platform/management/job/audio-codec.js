/**
 * @param data
 * @constructor
 */

class AudioCodec {
  constructor(data) {


    /**
     * @type {number}
     */
    this.cbr = null;

    /**
     * @type {string}
     */
    this.name = null;

    if (data) {
      this.deserialize(data);
    }
  }


  /**
   * @param data
   * @private
   */
  deserialize(data) {

    this.cbr = data.cbr;
    this.name = data.name;
  }

}


/**
 * @type {AudioCodec}
 */
export default AudioCodec;
export {AudioCodec};
