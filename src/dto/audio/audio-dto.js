var util = require('util');
var BaseDTO = require('../base-dto');
var AudioFile = require('./audio-file');

/**
 * @param {Object?} data
 * @constructor
 */
function AudioDTO(data) {
    BaseDTO.call(this);

    /**
     * @type {AudioFile|null}
     */
    this.inputFile = null;

    if (data) {
        this.deserialize(data);
    }
}
util.inherits(AudioDTO, BaseDTO);

/**
 * @param {Object} data
 * @private
 */
AudioDTO.prototype.deserialize = function (data) {
    AudioDTO.super_.prototype.deserialize.call(this, data);

    this.inputFile = new AudioFile(data.file_input);
};

/**
 * @type {AudioDTO}
 */
module.exports = AudioDTO;
// [
//     {
//         "parent_folder_id": "1b98ddebaa447184cd90f33753e6c474",
//         "created_ts": 1466413719,
//         "hash": "35df225c1634042f59e85aad37bae506",
//         "tags": [],
//         "file_name": "af63a5d465ce48a998297684f3246df6",
//         "labels": [],
//         "file_url": "ggl-109789773458215503884/audio/af63a5d465ce48a998297684f3246df6/file.mp3",
//         "original_file_name": "YEXuWYCjGR.mp3",
//         "modified_ts": 1466413719,
//         "file_size": 3528120,
//         "media_type": "music",
//         "icon_url": "wixmedia-public/images/b0068f926fc542fbb1f3653df8ce5099/music_note.png",
//         "mime_type": "audio/mp3",
//         "file_input": {
//             "format": "mp3",
//             "channels": 2,
//             "sample_size": 16,
//             "sample_rate": 44100,
//             "duration": 215883,
//             "bitrate": 128000
//         }
//     }
// ]