/**
 * @param data
 * @constructor
 */
function AudioCodec(data) {

    /**
     * @type {number}
     */
    this.cbr = null;

    /**
     * @type {string}
     */
    this.name = null;

    if (data) {
        this.deserialize(data);
    }
}

/**
 * @param data
 * @private
 */
AudioCodec.prototype.deserialize = function (data) {
    this.cbr = data.cbr;
    this.name = data.name;
};

/**
 * @type {AudioCodec}
 */
module.exports = AudioCodec;