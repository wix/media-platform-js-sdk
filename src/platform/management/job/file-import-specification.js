import {Destination} from './destination';

/**
 * @param data
 * @constructor
 */
function FileImportSpecification(data) {

  /**
   * @type {string}
   */
  this.sourceUrl = null;

  /**
   * @type {Destination}
   */
  this.destination = null;

  if (data) {
    this.deserialize(data);
  }
}

/**
 * @param data
 * @private
 */
FileImportSpecification.prototype.deserialize = function (data) {
  this.sourceUrl = data.sourceUrl;
  this.destination = new Destination(data.destination);
};

/**
 * @type {FileImportSpecification}
 */
export default FileImportSpecification;
export {FileImportSpecification};
