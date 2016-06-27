/**
 * @constructor
 */
function BaseFile() {

    /**
     * @type {string}
     */
    this.status = null;

    /**
     * @type {boolean}
     */
    this.secure = null;

    /**
     * @type {string}
     */
    this.url = null;

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
}

/**
 * @param {Object} data
 * @protected
 */
BaseFile.prototype.deserialize = function (data) {
    this.status = data.status;
    this.secure = data.secure;
    this.url = data.url;
    this.format = data.format;
    this.width = data.width;
    this.height = data.height;
};

/**
 * @type {BaseFile}
 */
module.exports = BaseFile;