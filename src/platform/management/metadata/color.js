/**
 * @constructor
 */
function Color(data) {

    /**
     * @type {number}
     */
    this.r = null;

    /**
     * @type {number}
     */
    this.g = null;

    /**
     * @type {number}
     */
    this.b = null;

    /**
     * @type {number}
     */
    this.pixelFraction = null;

    /**
     * @type {number}
     */
    this.score = null;

    if (data) {
        this.deserialize(data);
    }
}

/**
 * @param data
 * @private
 */
Color.prototype.deserialize = function (data) {
    this.r = data.r;
    this.g = data.g;
    this.b = data.b;
    this.pixelFraction = data.pixelFraction;
    this.score = data.score;
};

/**
 * @type {Color}
 */
module.exports = Color;



