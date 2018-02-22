import {Destination} from '../job/destination';

/**
 * @param data
 * @constructor
 */

class Dvr {
  constructor(data) {
    this.destination = null;

    if (data) {
      this.deserialize(data);
    }
  }

  /**
   * @param data
   * @private
   */
  deserialize(data) {
    this.destination = new Destination(data.destination);
  }

  /**
   *
   * @param destination {Destination}
   * @returns {Dvr}
   */
  setDestination(destination) {
    this.destination = destination;
    return this;
  }
}

/**
 * @type {Dvr}
 */
export default Dvr;
export {Dvr};
