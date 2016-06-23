/**
 * @param {Object?} data
 * @constructor
 */
function AudioFile(data) {

    /**
     * @type {string}
     */
    this.format = null;

    /**
     * @type {number}
     */
    this.channels = null;

    /**
     * @type {number}
     */
    this.sampleSize = null;

    /**
     * @type {number}
     */
    this.sampleRate = null;

    /**
     * @type {number}
     */
    this.duration = null;

    /**
     * @type {number}
     */
    this.bitrate = null;
    
    if (data) {
        this.deserialize(data);
    }
}

/**
 * @param {Object} data
 * @private
 */
AudioFile.prototype.deserialize = function (data) {
    this.format = data.format;
    this.channels = data.channels;
    this.sampleSize = data.sample_size;
    this.sampleRate = data.sample_rate;
    this.duration = data.duration;
    this.bitrate = data.bitrate;
};

/**
 * @type {AudioFile}
 */
module.exports = AudioFile;

//         "file_input": {
//             "format": "mp3",
//             "channels": 2,
//             "sample_size": 16,
//             "sample_rate": 44100,
//             "duration": 215883,
//             "bitrate": 128000
//         }