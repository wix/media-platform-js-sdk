import {VideoStream} from './video-stream';
import {AudioStream} from './audio-stream';
import {VideoFormat} from './video-format';

/**
 * @constructor
 */
function VideoBasicMetadata(data) {

  /**
   * @type {boolean}
   */
  this.interlaced = null;

  /**
   * @type {Array<VideoStream>}
   */
  this.videoStreams = null;

  /**
   * @type {Array<AudioStream>}
   */
  this.audioStreams = null;

  /**
   * @type {VideoFormat}
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
VideoBasicMetadata.prototype.deserialize = function (data) {
  this.interlaced = data.interlaced;
  this.videoStreams = data.videoStreams.map(function (videoStream) {
    return new VideoStream(videoStream)
  });
  this.audioStreams = data.audioStreams.map(function (audioStream) {
    return new AudioStream(audioStream)
  });
  this.format = new VideoFormat(data.format);
};


/**
 * @type {VideoBasicMetadata}
 */
export default VideoBasicMetadata;
export {VideoBasicMetadata};
