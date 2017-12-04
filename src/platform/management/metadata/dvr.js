var Destination = require('../job/destination');

/**
 * @param data
 * @constructor
 */
function Dvr(data) {
    this.destination = null;

    if (data) {
        this.deserialize(data);
    }
}

/**
 * @param data
 * @private
 */
Dvr.prototype.deserialize = function (data) {
    this.destination = new Destination(data.destination);
};

/**
 *
 * @param destination {Destination}
 * @returns {Dvr}
 */
Dvr.prototype.setDestination = function(destination) {
    this.destination = destination;
    return this;
};


/**
 * @type {Dvr}
 */
module.exports = Dvr;
