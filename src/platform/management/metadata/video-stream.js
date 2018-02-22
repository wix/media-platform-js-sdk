/**
 * @constructor
 */

class VideoStream {
  constructor(data) {


    /**
     * @type {string}
     */
    this.codecLongName = null;

    /**
     * @type {string}
     */
    this.codecTag = null;

    /**
     * @type {string}
     */
    this.codecName = null;

    /**
     * @type {number}
     */
    this.height = null;

    /**
     * @type {number}
     */
    this.width = null;

    /**
     * @type {number}
     */
    this.duration = null;

    /**
     * @type {number}
     */
    this.bitrate = null;

    /**
     * @type {number}
     */
    this.index = null;

    /**
     * @type {string}
     */
    this.rFrameRate = null;

    /**
     * @type {string}
     */
    this.avgFrameRate = null;

    /**
     * @type {string}
     */
    this.sampleAspectRatio = null;

    /**
     * @type {string}
     */
    this.displayAspectRatio = null;

    if (data) {
      this.deserialize(data);
    }
  }


  /**
   * @param data
   * @private
   */
  deserialize(data) {

    this.codecLongName = data.codecLongName;
    this.codecTag = data.codecTag;
    this.codecName = data.codecName;
    this.height = data.height;
    this.width = data.width;
    this.duration = data.duration;
    this.bitrate = data.bitrate;
    this.index = data.index;
    this.rFrameRate = data.rFrameRate;
    this.avgFrameRate = data.avgFrameRate;
    this.sampleAspectRatio = data.sampleAspectRatio;
    this.displayAspectRatio = data.displayAspectRatio;
  }

}


/**
 * @type {VideoStream}
 */
export default VideoStream;
export {VideoStream};
