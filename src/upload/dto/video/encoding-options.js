/**
 * @constructor
 */
function EncodingOptions () {

    /**
     * @type {{format: Array<string>, skipAudio: boolean, extractAudio: boolean}}
     */
    this.video = {
        format: [], //'mp4', 'webm', 'ogv'
        skipAudio: null,
        extractAudio: null
    };

    /**
     * @type {{format: string}}
     */
    this.audio = {
        format: '' //'mp3', 'm4a', 'ogg'
    };

    /**
     * @type {{format: string}}
     */
    this.image = {
        format: '' //'jpg', 'png'
    }
}

/**
 * @param {Array<string>} formats
 * @returns {EncodingOptions}
 */
EncodingOptions.prototype.videoFormats = function (formats) {
    this.video.format = formats;
    return this;
};

/**
 * @param {boolean} skipAudio
 * @returns {EncodingOptions}
 */
EncodingOptions.prototype.skipAudio = function (skipAudio) {
    this.video.skipAudio = skipAudio;
    return this;
};

/**
 * @param {boolean} extractAudio
 * @returns {EncodingOptions}
 */
EncodingOptions.prototype.extractAudio = function (extractAudio) {
    this.video.extractAudio = extractAudio;
    return this;
};

/**
 * @param {string} format
 * @returns {EncodingOptions}
 */
EncodingOptions.prototype.audioFormat = function (format) {
    this.audio.format = format;
    return this;
};

/**
 * @param {string} format
 * @returns {EncodingOptions}
 */
EncodingOptions.prototype.imageFormat = function (format) {
    this.image.format = format;
    return this;
};

/**
 * @type {EncodingOptions}
 */
module.exports = EncodingOptions;