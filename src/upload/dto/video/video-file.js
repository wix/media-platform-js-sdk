var util = require('util');
var BaseFile = require('./base-file');

/**
 * @constructor
 */
function VideoFile() {
    
    this.tag = null;

    this.fps = null;
    
    this.videoBitrate = null;
    
    this.audioBitrate = null;
    
    this.duration = null;
    
    this.quality = null;
    
    this.displayAspectRatio = null;
    
    this.sampleAspectRatio = null;
    
    this.rotation = null;
    
    this.type = null;
    
}
util.inherits(VideoFile, BaseFile);

/**
 * @type {VideoFile}
 */
module.exports = VideoFile;

//{
//                     "status": "INPROGRESS",
//                     "secure": false,
//                     "fps": 25.0,
//                     "format": "mp4",
//                     "url": "video/e66d82_ca6c7b4fc81f45c9bcf219d81395d3ec/480p/mp4/file.mp4",
//                     "video_bitrate": 1200000,
//                     "height": 480,
//                     "width": 854,
//                     "tag": "High",
//                     "audio_bitrate": 196000,
//                     "duration": 5280,
//                     "quality": "480p",
//                     "display_aspect_ratio": "16:9"
//                 }