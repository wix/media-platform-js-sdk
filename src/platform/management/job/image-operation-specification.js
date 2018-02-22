import {Destination} from './destination';

/**
 * @param {{}?} data
 * @constructor
 */
function ImageOperationSpecification(data) {

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
ImageOperationSpecification.prototype.setCommand = function (command) {
  this.command = command;
  return this;
};

/**
 * @param {Destination} destination
 * @return {ImageOperationSpecification}
 */
ImageOperationSpecification.prototype.setDestination = function (destination) {
  this.destination = destination;
  return this;
};

/**
 * @param data
 * @private
 */
ImageOperationSpecification.prototype.deserialize = function (data) {
  this.command = data.command;
  this.destination = new Destination(data.destination);
};

/**
 * @type {ImageOperationSpecification}
 */
export default ImageOperationSpecification;
export {ImageOperationSpecification};
