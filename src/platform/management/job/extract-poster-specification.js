var Destination = require('./destination');

/**
 * @param data
 * @constructor
 */
function ExtractPosterSpecification(data) {

    /**
     * @type {Destination}
     */
    this.destination = null;

    /**
     * @type {int}
     */
    this.second = null;

    /**
     * @type {string}
     */
    this.format = null;


    if (data) {
        this.deserialize(data);
    }
}

/**
 * @param {Destination} destination
 * @returns {ExtractPosterSpecification}
 */
ExtractPosterSpecification.prototype.setDestination = function (destination) {
    this.destination = destination;
    return this;
};

/**
 * @param {string} format
 * @returns {ExtractPosterSpecification}
 */
ExtractPosterSpecification.prototype.setFormat = function (format) {
    this.format = format;
    return this;
};

/**
 * @param {int} second
 * @returns {ExtractPosterSpecification}
 */
ExtractPosterSpecification.prototype.setSecond = function (second) {
    this.second = second;
    return this;
};

/**
 * @param data
 * @private
 */
ExtractPosterSpecification.prototype.deserialize = function (data) {
    this.destination = new Destination(data.destination);
    this.format = data.format;
    this.second = data.second;
};

/**
 * @type {ExtractPosterSpecification}
 */
module.exports = ExtractPosterSpecification;