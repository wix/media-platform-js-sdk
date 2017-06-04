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
 * @param {string} path
 * @returns {Destination}
 */
Destination.prototype.setPath = function (path) {
    this.path = path;
    this.directory = null;
    return this;
};

/**
 * @param {string} directory
 * @returns {Destination}
 */
Destination.prototype.setDirectory = function (directory) {
    this.directory = directory;
    this.path = null;
    return this;
};

/**
 * @param {string} acl
 * @returns {Destination}
 */
Destination.prototype.setAcl = function (acl) {
    this.acl = acl;
    return this;
};

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