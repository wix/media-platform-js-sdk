/**
 * @param data
 * @constructor
 */
function PlaybackUrl(data) {

    /**
     *
     * @type {String}
     */
    this.path = null;

    /**
     *
     * @type {String}
     */
    this.packageName = null;

    if (data) {
        this.deserialize(data);
    }
}
/**
 * @param data
 * @private
 */
PlaybackUrl.prototype.deserialize = function (data) {
    this.path = data.path;
    this.packageName = data.packageName;
};

/**
 *
 * @param path {String}
 * @returns {PlaybackUrl}
 */
PlaybackUrl.prototype.setPath = function(path) {
    this.path = path;
    return this;
};

/**
 *
 * @param packageName {String}
 * @returns {PlaybackUrl}
 */
PlaybackUrl.prototype.setPackageName = function(packageName) {
    this.packageName = packageName;
    return this;
};


/**
 * @type {PlaybackUrl}
 */
module.exports = PlaybackUrl;
