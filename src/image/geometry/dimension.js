/**
 * @param {number?} width
 * @param {number?} height
 * @constructor
 */
function Dimension(width, height) {
    /**
     * @type {number|null}
     */
    this.width = width || null;

    /**
     * @type {number|null}
     */
    this.height = height || null;
}

/**
 * @param {number} width
 * @returns {Dimension}
 */
Dimension.prototype.setWidth = function (width) {
    this.width = width;
    return this;
};

/**
 * @param {number} height
 * @returns {Dimension}
 */
Dimension.prototype.setHeight = function (height) {
    this.height = height;
    return this;
};

/**
 * @type {Dimension}
 */
module.exports = Dimension;