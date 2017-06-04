var VideoSpecification = require('./video-specification');

/**
 * @param data
 * @constructor
 */
function Video(data) {

    /**
     * @type {VideoSpecification}
     */
    this.specification = null;

    if (data) {
        this.deserialize(data);
    }
}

/**
 * @param data
 * @private
 */
Video.prototype.deserialize = function (data) {
    this.specification = new VideoSpecification(data.specification);
};

/**
 * @type {Video}
 */
module.exports = Video;