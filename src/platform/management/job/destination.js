/**
 * @param data
 * @constructor
 */
function Destination(data) {

    /**
     * @type {string}
     */
    this.path = null;

    /**
     * @type {string}
     */
    this.directory = null;

    /**
     * @type {string}
     */
    this.acl = null;

    if (data) {
        this.deserialize(data);
    }
}

/**
 * @param data
 * @private
 */
Destination.prototype.deserialize = function (data) {
    this.path = data.path;
    this.directory = data.directory;
    this.acl = data.acl;
};

/**
 * @type {Destination}
 */
module.exports = Destination;