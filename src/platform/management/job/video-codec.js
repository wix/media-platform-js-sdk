function VideoCodec(data) {

    /**
     * @type {string}
     */
    this.profile = null;

    /**
     * @type {number}
     */
    this.maxRate = null;

    /**
     * @type {number}
     */
    this.crf = null;

    /**
     * @type {string}
     */
    this.name = null;

    /**
     * @type {string}
     */
    this.level = null;

    if (data) {
        this.deserialize(data);
    }
}

/**
 * @param data
 * @private
 */
VideoCodec.prototype.deserialize = function (data) {
    this.profile = data.profile;
    this.maxRate = data.maxRate;
    this.crf = data.crf;
    this.name = data.name;
    this.level = data.level;
};

/**
 * @type {VideoCodec}
 */
module.exports = VideoCodec;