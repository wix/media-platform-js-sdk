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
    var coordinates = data.coordinates || null;

    if(coordinates !== null) {
        this.coordinates = {
            "latitude": coordinates.latitude || null,
            "longitute": coordinates.longitude || null
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
