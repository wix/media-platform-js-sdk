/**
 * @param {number} width
 * @param {number} height
 * @param {string} mimeType
 * @constructor
 */
function OriginalImageData(width, height, mimeType) {

    /**
     * @type {number}
     */
    this.width = width;

    /**
     * @type {number}
     */
    this.height = height;

    /**
     * @type {string}
     */
    this.mimeType = mimeType;
}

/**
 * @returns {string}
 */
OriginalImageData.prototype.serialize = function() {
    return 'w_' + this.width + ',h_' + this.height + ',mt_' + encodeURIComponent(this.mimeType);
};

/**
 * @type {OriginalImageData}
 */
module.exports = OriginalImageData;