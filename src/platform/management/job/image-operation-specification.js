import {Destination} from './destination';

/**
 * @param {{}?} data
 * @constructor
 */

class ImageOperationSpecification {
  constructor(data) {


    /**
     * @type {string}
     */
    this.command = null;

    /**
     * @type {Destination}
     */
    this.destination = null;

    if (data) {
      this.deserialize(data);
    }
  }


  /**
   * @param {string} command
   * @return {ImageOperationSpecification}
   */
  setCommand(command) {

    this.command = command;
    return this;
  }


  /**
   * @param {Destination} destination
   * @return {ImageOperationSpecification}
   */
  setDestination(destination) {

    this.destination = destination;
    return this;
  }


  /**
   * @param data
   * @private
   */
  deserialize(data) {

    this.command = data.command;
    this.destination = new Destination(data.destination);
  }

}


/**
 * @type {ImageOperationSpecification}
 */
export default ImageOperationSpecification;
export {ImageOperationSpecification};
