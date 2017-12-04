var _ = require('lodash');
/**
 * @param data
 * @constructor
 */
function Geo(data) {

    /**
     *
     * @type {Object}
     */
    this.coordinates = null;

    /**
     *
     * @type {String}
     */
    this.ipAddress = null;

    if (data) {
        this.deserialize(data);
    }
}

/**
 * @param data
 * @private
 */
Geo.prototype.deserialize = function (data) {
    var coordinates = _.get(data, ['coordinates'], null);

    if(coordinates !== null) {
        this.coordinates = {
            "latitude": _.get(data, ['coordinates', 'latitude'], null),
            "longitute": _.get(data, ['coordinates', 'longitude'], null)
        };
    }
    this.ipAddress = data.ipAddress;
};

/**
 *
 * @param coordinates {Object}
 * @returns {Geo}
 */
Geo.prototype.setCoordinates = function(coordinates) {
    this.coordinates = coordinates;
    return this;
};

/**
 *
 * @param ipAddress {String}
 * @returns {Geo}
 */
Geo.prototype.setIpAddress = function(ipAddress) {
    this.ipAddress = ipAddress;
    return this;
};



/**
 * @type {Geo}
 */
module.exports = Geo;
