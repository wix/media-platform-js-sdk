var VideoStream = require('./video-stream');
var AudioStream = require('./audio-stream');
var VideoFormat = require('./video-format');

/**
 * @constructor
 */
function VideoBasicMetadata(data) {

    /**
     * @type {boolean}
     */
    this.interlaced = null;

    /**
     * @type {string}
     */
    this.videoStreams = null;

    /**
     * @type {string}
     */
    this.audioStreams = null;

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
module.exports = VideoBasicMetadata;
