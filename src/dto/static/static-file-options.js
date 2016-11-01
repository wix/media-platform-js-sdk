/**
 * @constructor
 */
function StaticFileOptions () {
    /**
     * @type {boolean}
     */
    this.compress = null;
}

/**
 * @param {boolean} compress
 * @returns {StaticFileOptions}
 */
StaticFileOptions.prototype.setCompress = function (compress) {
    this.compress = compress;
    return this;
};

/**
 * @returns {{}}
 */
StaticFileOptions.prototype.toFormParams = function () {
    var params = {};

    if (this.compress !== null) {
        params.compress = this.compress ? 1 : 0;
    }

    return params;
};

/**
 * @type {StaticFileOptions}
 */
module.exports = StaticFileOptions;