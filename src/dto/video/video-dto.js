var inherits = require('inherits');
var BaseDTO = require('../base-dto');
var VideoFile = require('./video-file');
var ImageFile = require('./image-file');

/**
 * @param {Object?} data
 * @constructor
 */
function VideoDTO(data) {
    BaseDTO.call(this);

    /**
     * @type {number}
     */
    this.height = null;

    /**
     * @type {number}
     */
    this.width = null;

    /**
     * @type {string}
     */
    this.iconUrl = null;

    /**
     * @type {VideoFile|null}
     */
    this.inputFile = null;

    /**
     * @type {{image: Array<ImageFile>, video: Array<VideoFile>}|null}
     */
    this.outputFiles = null;

    if (data) {
        this.deserialize(data);
    }

}
inherits(VideoDTO, BaseDTO);

/**
 * @param {Object} data
 * @protected
 */
VideoDTO.prototype.deserialize = function (data) {
    VideoDTO.super_.prototype.deserialize.call(this, data);

    this.height = data.height;
    this.width = data.width;
    this.iconUrl = data.icon_url;
    this.inputFile = new VideoFile(data.file_input);

    var images = [];
    if (data.file_output) {
        images = data.file_output.image.map(function toImage(item) {
            return new ImageFile(item);
        });
    }
    var videos = [];
    if (data.file_output) {
        videos = data.file_output.video.map(function toVideo(item) {
            return new VideoFile(item);
        });
    }

    this.outputFiles = {
        images: images,
        videos: videos
    };
};

/**
 * @type {VideoDTO}
 */
module.exports = VideoDTO;

//
// [
//     {
//         "parent_folder_id": "dbbbc0fd90024aab84a7a7653c803659",
//         "created_ts": 1466344754,
//         "hash": "d55bddf8d62910879ed9f605522149a8",
//         "tags": [],
//         "file_name": "e66d82_ca6c7b4fc81f45c9bcf219d81395d3ec",
//         "labels": [],
//         "file_url": "video/e66d82_ca6c7b4fc81f45c9bcf219d81395d3ec/file",
//         "height": 720,
//         "width": 1280,
//         "original_file_name": "SampleVideo_1080x720_1mb copy 2.mp4",
//         "modified_ts": 1466344753,
//         "file_size": 1055736,
//         "media_type": "video",
//         "op_status": "IN-QUEUE",
//         "icon_url": "media/e66d82_ca6c7b4fc81f45c9bcf219d81395d3ecf002.jpg",
//         "mime_type": "video/mp4",
//         "file_input": {
//             "fps": 25.0,
//             "video_bitrate": 1205959,
//             "height": 720,
//             "width": 1280,
//             "audio_bitrate": 384828,
//             "sample_aspect_ratio": "1:1",
//             "duration": 5280,
//             "rotation": 0,
//             "type": "video",
//             "display_aspect_ratio": "16:9"
//         }
//         "file_output": {
//             "image": [
//                 {
//                     "status": "READY",
//                     "secure": false,
//                     "format": "jpg",
//                     "url": "media/e66d82_ca6c7b4fc81f45c9bcf219d81395d3ecf000.jpg",
//                     "height": 720,
//                     "width": 1280
//                 },
//                 {
//                     "status": "READY",
//                     "secure": false,
//                     "format": "jpg",
//                     "url": "media/e66d82_ca6c7b4fc81f45c9bcf219d81395d3ecf001.jpg",
//                     "height": 720,
//                     "width": 1280
//                 },
//                 {
//                     "status": "READY",
//                     "secure": false,
//                     "format": "jpg",
//                     "url": "media/e66d82_ca6c7b4fc81f45c9bcf219d81395d3ecf002.jpg",
//                     "height": 720,
//                     "width": 1280
//                 },
//                 {
//                     "status": "READY",
//                     "secure": false,
//                     "format": "jpg",
//                     "url": "media/e66d82_ca6c7b4fc81f45c9bcf219d81395d3ecf003.jpg",
//                     "height": 720,
//                     "width": 1280
//                 }
//             ],
//             "video": [
//                 {
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
//                 },
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
//             ]
//         }
//     }
// ]
