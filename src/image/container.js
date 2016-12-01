/**
 * @param {number?} width
 * @param {number?} height
 * @constructor
 */
function Container(width, height) {
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
 * @returns {Container}
 */
Container.prototype.setWidth = function (width) {
    this.width = width;
    return this;
};

/**
 * @param {number} height
 * @returns {Container}
 */
Container.prototype.setHeight = function (height) {
    this.height = height;
    return this;
};

/**
 * @type {Container}
 */
module.exports = Container;