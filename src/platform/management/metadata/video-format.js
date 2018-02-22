/**
 * @constructor
 */
function VideoFormat(data) {

  /**
   * @type {string}
   */
  this.formatLongName = null;

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
  this.size = null;

  if (data) {
    this.deserialize(data);
  }
}

/**
 * @param data
 * @private
 */
VideoFormat.prototype.deserialize = function (data) {
  this.formatLongName = data.formatLongName;
  this.duration = data.duration;
  this.bitrate = data.bitrate;
  this.size = data.size;
};

/**
 * @type {VideoFormat}
 */
export default VideoFormat;
export {VideoFormat};
