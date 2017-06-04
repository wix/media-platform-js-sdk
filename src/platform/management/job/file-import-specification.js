var Destination = require('./destination');

/**
 * @param data
 * @constructor
 */
function FileImportSpecification(data) {

    /**
     * @type {string}
     */
    this.sourceUrl = null;

    /**
     * @type {Destination}
     */
    this.destination = null;

    if (data) {
        this.deserialize(data);
    }
}

/**
 * @param data
 * @private
 */
FileImportSpecification.prototype.deserialize = function (data) {
    this.sourceUrl = data.sourceUrl;
    this.destination = new Destination(data.destination);
};

/**
 * @type {FileImportSpecification}
 */
module.exports = FileImportSpecification;