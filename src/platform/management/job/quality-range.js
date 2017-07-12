/**
 * @param data
 * @constructor
 */
function QualityRange(data) {

    /**
     * @type {string}
     */
    this.minimum = null;

    /**
     * @type {string}
     */
    this.maximum = null;

    if (data) {
        this.deserialize(data);
    }
}

/**
 * @param data
 * @private
 */
QualityRange.prototype.deserialize = function (data) {
    this.minimum = data.minimum;
    this.maximum = data.maximum;
};

/**
 * @type {Video}
 */
module.exports = QualityRange;