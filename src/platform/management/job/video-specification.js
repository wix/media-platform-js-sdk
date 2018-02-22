import {VideoCodec} from './video-codec';
import {Resolution} from './resolution';

/**
 * @param data
 * @constructor
 */

class VideoSpecification {
  constructor(data) {


    /**
     * @type {string}
     */
    this.frameRate = null;

    /**
     * @type {number}
     */
    this.keyFrame = null;

    /**
     * @type {VideoCodec}
     */
    this.codec = null;

    /**
     * @type {Resolution}
     */
    this.resolution = null;

    if (data) {
      this.deserialize(data);
    }
  }


  /**
   * @param data
   * @private
   */
  deserialize(data) {

    this.frameRate = data.frameRate;
    this.keyFrame = data.keyFrame;
    this.codec = new VideoCodec(data.codec);
    this.resolution = new Resolution(data.resolution);
  }

}


/**
 * @type {VideoSpecification}
 */
export default VideoSpecification;
export {VideoSpecification};
