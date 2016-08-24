var inherits = require('inherits');
var BaseFile = require('./base-file');

/**
 * @param {Object?} data
 * @constructor
 */
function VideoFile(data) {

    /**
     * @type {string}
     */
    this.tag = null;

    /**
     * @type {string}
     */
    this.fps = null;

    /**
     * @type {number}
     */
    this.videoBitrate = null;

    /**
     * @type {number}
     */
    this.audioBitrate = null;

    /**
     * @type {number}
     */
    this.duration = null;

    /**
     * @type {string}
     */
    this.quality = null;

    /**
     * @type {string}
     */
    this.displayAspectRatio = null;

    /**
     * @type {string}
     */
    this.sampleAspectRatio = null;

    /**
     * @type {number}
     */
    this.rotation = null;

    /**
     * @type {string}
     */
    this.type = null;
    
    if (data) {
        this.deserialize(data);
    }
}
inherits(VideoFile, BaseFile);

/**
 * @param {Object} data
 * @protected
 */
VideoFile.prototype.deserialize = function (data) {
    this.tag = data.tag || null;
    this.fps = data.fps;
    this.videoBitrate = data.video_bitrate;
    this.audioBitrate = data.audio_bitrate;
    this.duration = data.duration;
    this.quality = data.quality || null;
    this.displayAspectRatio = data.display_aspect_ratio || null;
    this.sampleAspectRatio = data.sample_aspect_ratio || null;
    this.rotation = data.rotation === undefined ? null : data.rotation;
    this.type = data.type || null;
};

/**
 * @type {VideoFile}
 */
module.exports = VideoFile;

// {
//     "status": "INPROGRESS",
//     "secure": false,
//     "fps": "25/1",
//     "format": "mp4",
//     "url": "ggl-109789773458215503884/video/2e44912c30e44beca4c623035b4418de/480p/mp4/file.mp4",
//     "video_bitrate": 1200000,
//     "height": 480,
//     "width": 768,
//     "tag": "High",
//     "audio_bitrate": 3112,
//     "key": "480p.mp4",
//     "duration": 12000,
//     "quality": "480p",
//     "display_aspect_ratio": "8:5"
// }