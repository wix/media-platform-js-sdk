import {AudioCodec} from './audio-codec';

/**
 * @param data
 * @constructor
 */

class AudioSpecification {
  constructor(data) {


    /**
     * @type {string}
     */
    this.channels = null;

    /**
     * @type {AudioCodec}
     */
    this.codec = null;

    if (data) {
      this.deserialize(data);
    }
  }


  /**
   * @param data
   * @private
   */
  deserialize(data) {

    this.channels = data.channels;
    this.codec = new AudioCodec(data.codec);
  }

}


/**
 * @type {AudioSpecification}
 */
export default AudioSpecification;
export {AudioSpecification};
