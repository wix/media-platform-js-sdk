var VideoCodec = require('./video-codec');
var Resolution = require('./resolution');

/**
 * @param data
 * @constructor
 */
function VideoSpecification(data) {

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
VideoSpecification.prototype.deserialize = function (data) {
    this.frameRate = data.frameRate;
    this.keyFrame = data.keyFrame;
    this.codec = new VideoCodec(data.codec);
    this.resolution = new Resolution(data.resolution);
};

/**
 * @type {VideoSpecification}
 */
module.exports = VideoSpecification;