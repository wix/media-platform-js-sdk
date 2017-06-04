var AudioCodec = require('./audio-codec');

/**
 * @param data
 * @constructor
 */
function AudioSpecification(data) {

    /**
     * @type {string}
     */
    this.channels = null;

    /**
     * @type {AudioCodec}
     */
    this.codec = null;

    if (data) {
        this.deserialize(data);
    }
}

/**
 * @param data
 * @private
 */
AudioSpecification.prototype.deserialize = function (data) {
    this.channels = data.channels;
    this.codec = new AudioCodec(data.codec);
};

/**
 * @type {AudioSpecification}
 */
module.exports = AudioSpecification;