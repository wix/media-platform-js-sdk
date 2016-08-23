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

// {
//     "parent_folder_id": "40700af2c4d942a9f77c157baee95fd9",
//     "created_ts": 1471955310,
//     "hash": "f5ea6d9e1de2ae552f4dbedcbcf9bb94",
//     "tags": [],
//     "file_name": "2e44912c30e44beca4c623035b4418de",
//     "refs": [],
//     "labels": [],
//     "file_url": "ggl-109789773458215503884/video/2e44912c30e44beca4c623035b4418de/file.mp4",
//     "height": 1080,
//     "width": 1728,
//     "original_file_name": "video.mp4",
//     "modified_ts": 1471955309,
//     "file_size": 4151438,
//     "media_type": "video",
//     "file_output": {
//     "image": [{
//         "status": "READY",
//         "secure": false,
//         "format": "jpg",
//         "url": "ggl-109789773458215503884/images/2e44912c30e44beca4c623035b4418def000/file.jpg",
//         "height": 1080,
//         "width": 1728
//     }, {
//         "status": "READY",
//         "secure": false,
//         "format": "jpg",
//         "url": "ggl-109789773458215503884/images/2e44912c30e44beca4c623035b4418def001/file.jpg",
//         "height": 1080,
//         "width": 1728
//     }, {
//         "status": "READY",
//         "secure": false,
//         "format": "jpg",
//         "url": "ggl-109789773458215503884/images/2e44912c30e44beca4c623035b4418def002/file.jpg",
//         "height": 1080,
//         "width": 1728
//     }, {
//         "status": "READY",
//         "secure": false,
//         "format": "jpg",
//         "url": "ggl-109789773458215503884/images/2e44912c30e44beca4c623035b4418def003/file.jpg",
//         "height": 1080,
//         "width": 1728
//     }],
//         "video": [{
//         "status": "INPROGRESS",
//         "secure": false,
//         "fps": "25/1",
//         "format": "mp4",
//         "url": "ggl-109789773458215503884/video/2e44912c30e44beca4c623035b4418de/480p/mp4/file.mp4",
//         "video_bitrate": 1200000,
//         "height": 480,
//         "width": 768,
//         "tag": "High",
//         "audio_bitrate": 3112,
//         "key": "480p.mp4",
//         "duration": 12000,
//         "quality": "480p",
//         "display_aspect_ratio": "8:5"
//     }, {
//         "status": "INPROGRESS",
//         "secure": false,
//         "fps": "25/1",
//         "format": "mp4",
//         "url": "ggl-109789773458215503884/video/2e44912c30e44beca4c623035b4418de/720p/mp4/file.mp4",
//         "video_bitrate": 2757180,
//         "height": 720,
//         "width": 1152,
//         "tag": "HD",
//         "audio_bitrate": 3112,
//         "key": "720p.mp4",
//         "duration": 12000,
//         "quality": "720p",
//         "display_aspect_ratio": "8:5"
//     }, {
//         "status": "INPROGRESS",
//         "secure": false,
//         "fps": "25/1",
//         "format": "mp4",
//         "url": "ggl-109789773458215503884/video/2e44912c30e44beca4c623035b4418de/1080p/mp4/file.mp4",
//         "video_bitrate": 2757180,
//         "height": 1080,
//         "width": 1728,
//         "tag": "HD",
//         "audio_bitrate": 3112,
//         "key": "1080p.mp4",
//         "duration": 12000,
//         "quality": "1080p",
//         "display_aspect_ratio": "8:5"
//     }]
// },
//     "op_status": "IN-QUEUE",
//     "icon_url": "ggl-109789773458215503884/images/2e44912c30e44beca4c623035b4418def002/file.jpg",
//     "mime_type": "video/mp4",
//     "file_input": {
//     "fps": "25/1",
//         "video_bitrate": 2757180,
//         "height": 1080,
//         "width": 1728,
//         "audio_bitrate": 3112,
//         "sample_aspect_ratio": "1:1",
//         "duration": 12000,
//         "rotation": 0,
//         "type": "video",
//         "display_aspect_ratio": "8:5"
// }
// }
