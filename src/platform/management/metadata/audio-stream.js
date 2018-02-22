/**
 * @constructor
 */
function AudioStream(data) {

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
  this.duration = null;

  /**
   * @type {number}
   */
  this.bitrate = null;

  /**
   * @type {number}
   */
  this.index = null;

  if (data) {
    this.deserialize(data);
  }
}

/**
 * @param data
 * @private
 */
AudioStream.prototype.deserialize = function (data) {
  this.codecLongName = data.codecLongName;
  this.codecTag = data.codecTag;
  this.codecName = data.codecName;
  this.duration = data.duration;
  this.bitrate = data.bitrate;
  this.index = data.index;
};

/**
 * @type {AudioStream}
 */
export default AudioStream;
export {AudioStream};
