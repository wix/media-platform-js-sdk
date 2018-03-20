var Destination = require('./destination');

/**
 * @param data
 * @constructor
 */
function ExtractStoryboardSpecification(data) {

    /**
     * @type {Destination}
     */
    this.destination = null;

    /**
     * @type {int}
     */
    this.columns = null;

    /**
     * @type {int}
     */
    this.rows = null;

    /**
     * @type {int}
     */
    this.tileWidth = null;

    /**
     * @type {int}
     */
    this.tileHeight = null;

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
 * @returns {ExtractStoryboardSpecification}
 */
ExtractStoryboardSpecification.prototype.setDestination = function (destination) {
    this.destination = destination;
    return this;
};

/**
 * @param {string} format
 * @returns {ExtractStoryboardSpecification}
 */
ExtractStoryboardSpecification.prototype.setFormat = function (format) {
    this.format = format;
    return this;
};

/**
 * @param {int} columns
 * @returns {ExtractStoryboardSpecification}
 */
ExtractStoryboardSpecification.prototype.setColumns = function (columns) {
    this.columns = columns;
    return this;
};

/**
 * @param {int} rows
 * @returns {ExtractStoryboardSpecification}
 */
ExtractStoryboardSpecification.prototype.setRows = function (rows) {
    this.rows = rows;
    return this;
};

/**
 * @param {int} tileWidth
 * @returns {ExtractStoryboardSpecification}
 */
ExtractStoryboardSpecification.prototype.setTileWidth = function (tileWidth) {
    this.tileWidth = tileWidth;
    return this;
};

/**
 * @param {int} tileHeight
 * @returns {ExtractStoryboardSpecification}
 */
ExtractStoryboardSpecification.prototype.setTileHeight = function (tileHeight) {
    this.tileHeight = tileHeight;
    return this;
};

/**
 * @param data
 * @private
 */
ExtractStoryboardSpecification.prototype.deserialize = function (data) {
    this.destination = new Destination(data.destination);
    this.columns = data.columns;
    this.rows = data.rows;
    this.tileWidth = data.tileWidth;
    this.tileHeight = data.tileHeight;
    this.format = data.format;
};

/**
 * @type {ExtractStoryboardSpecification}
 */
module.exports = ExtractStoryboardSpecification;