/**
 * @constructor
 */
function VideoPosters(data) {

    /**
     * @type {string}
     */
    this.format = null;

    /**
     * @type {number}
     */
    this.width = null;

    /**
     * @type {number}
     */
    this.height = null;

    /**
     * @type {string[]}
     */
    this.urls = [];

    if (data) {
      this.deserialize(data);
    }
}

/**
 * @param data
 * @private
 */
VideoPosters.prototype.deserialize = function (data) {
    this.format = data.format;
    this.width = data.width;
    this.height = data.height;
    this.urls = data.urls;
};

/**
 * @type {VideoPosters}
 */
module.exports = VideoPosters;
