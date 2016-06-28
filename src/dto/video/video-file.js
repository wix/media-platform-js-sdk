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
     * @type {number}
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
    this.displayAspectRatio = data.display_aspect_ratio;
    this.sampleAspectRatio = data.sample_aspect_ratio;
    this.rotation = data.rotation;
    this.type = data.type;  
};

/**
 * @type {VideoFile}
 */
module.exports = VideoFile;

//                 {
//                     "status": "INPROGRESS",
//                     "secure": false,
//                     "fps": 25.0,
//                     "format": "mp4",
//                     "url": "video/e66d82_ca6c7b4fc81f45c9bcf219d81395d3ec/720p/mp4/file.mp4",
//                     "video_bitrate": 1205959,
//                     "height": 720,
//                     "width": 1280,
//                     "tag": "HD",
//                     "audio_bitrate": 196000,
//                     "duration": 5280,
//                     "quality": "720p",
//                     "display_aspect_ratio": "16:9"
//                 }