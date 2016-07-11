/**
 * @constructor
 */
function EncodingOptions () {

    /**
     * @type {Array<string>}
     */
    this.videoFormats = []; //'mp4', 'webm', 'ogv'

    /**
     * @type {boolean}
     */
    this.skipAudio = null;

    /**
     * @type {boolean}
     */
    this.extractAudio = null;

    /**
     * @type {string}
     */
    this.audioFormat = null; //'mp3', 'm4a', 'ogg'

    /**
     * @type {string}
     */
    this.imageFormat = null; //'jpg', 'png'
}

/**
 * @param {Array<string>} formats
 * @returns {EncodingOptions}
 */
EncodingOptions.prototype.setVideoFormats = function (formats) {
    this.videoFormats = formats;
    return this;
};

/**
 * @param {boolean} skipAudio
 * @returns {EncodingOptions}
 */
EncodingOptions.prototype.setSkipAudio = function (skipAudio) {
    this.skipAudio = skipAudio;
    return this;
};

/**
 * @param {boolean} extractAudio
 * @returns {EncodingOptions}
 */
EncodingOptions.prototype.setExtractAudio = function (extractAudio) {
    this.extractAudio = extractAudio;
    return this;
};

/**
 * @param {string} format
 * @returns {EncodingOptions}
 */
EncodingOptions.prototype.setAudioFormat = function (format) {
    this.audioFormat = format;
    return this;
};

/**
 * @param {string} format
 * @returns {EncodingOptions}
 */
EncodingOptions.prototype.setImageFormat = function (format) {
    this.imageFormat = format;
    return this;
};

/**
 * @returns {{}}
 */
EncodingOptions.prototype.toFormParams = function () {

    var params = {};

    if (this.videoFormats && this.videoFormats.length > 0) {

        if (!params.video) {
            params.video = {};
        }

        params.video.format = this.videoFormats;
    }

    if (this.skipAudio) {

        if (!params.video) {
            params.video = {};
        }

        params.video.skip_audio = this.skipAudio;
    }

    if (this.extractAudio) {

        if (!params.video) {
            params.video = {};
        }

        params.video.extract_audio = this.extractAudio;
    }

    if (this.audioFormat) {

        if (!params.audio) {
            params.audio = {};
        }

        params.audio.format = this.audioFormat;
    }

    if (this.imageFormat) {

        if (!params.image) {
            params.image = {};
        }

        params.image.format = this.imageFormat;
    }

    return {
        encoding_options: JSON.stringify({file_output: params})
    }
};

/**
 * @type {EncodingOptions}
 */
module.exports = EncodingOptions;