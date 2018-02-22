/**
 * @param data
 * @constructor
 */

class Geo {
  constructor(data) {


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
  deserialize(data) {

    var coordinates = data.coordinates || null;

    if (coordinates !== null) {
      this.coordinates = {
        'latitude': coordinates.latitude || null,
        'longitute': coordinates.longitude || null
      };
    }
    this.ipAddress = data.ipAddress;
  }


  /**
   *
   * @param coordinates {Object}
   * @returns {Geo}
   */
  setCoordinates(coordinates) {

    this.coordinates = coordinates;
    return this;
  }


  /**
   *
   * @param ipAddress {String}
   * @returns {Geo}
   */
  setIpAddress(ipAddress) {

    this.ipAddress = ipAddress;
    return this;
  }

}


/**
 * @type {Geo}
 */
export default Geo;
export {Geo};
