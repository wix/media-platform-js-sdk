function Source(data) {

    /**
     * @type {string}
     */
    this.fileId = null;

    /**
     * @type {string}
     */
    this.path = null;

    if (data) {
        this.deserialize(data);
    }
}

/**
 * @param data
 * @private
 */
Source.prototype.deserialize = function (data) {
    this.fileId = data.fileId;
    this.path = data.path;
};

/**
 * @type {Source}
 */
module.exports = Source;