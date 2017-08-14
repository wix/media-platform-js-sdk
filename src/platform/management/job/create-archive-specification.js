var Source = require('./source');
var Destination = require('./destination');

/**
 * @param data
 * @constructor
 */
function CreateArchiveSpecification(data) {

    /**
     * @type {array}
     */
    this.sources = null;

    /**
     * @type {Destination}
     */
    this.destination = null;

    /**
     * @type {string}
     */
    this.archiveType = null;

    if (data) {
        this.deserialize(data);
    }
}

/**
 * @param data
 * @private
 */
CreateArchiveSpecification.prototype.deserialize = function (data) {
    this.sources = data.sources.map(function (source) {
        return new Source(source)
    });
    this.destination = new Destination(data.destination);
    this.archiveType = data.archiveType;

};

/**
 * @type {CreateArchiveSpecification}
 */
module.exports = CreateArchiveSpecification;