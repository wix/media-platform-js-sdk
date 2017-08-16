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
 * @param {string} minimum
 * @returns {QualityRange}
 */
QualityRange.prototype.setMinimum = function (minimum) {
    this.minimum = minimum;
    return this;
};

/**
 * @param {string} maximum
 * @returns {QualityRange}
 */
QualityRange.prototype.setMaximum = function (maximum) {
    this.maximum = maximum;
    return this;
};

/**
 * @param data
 * @private
 */
QualityRange.prototype.deserialize = function (data) {
    this.minimum = data.minimum;
    this.maximum = data.maximum;
};

/**
 * @type {QualityRange}
 */
module.exports = QualityRange;