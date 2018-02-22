import {Destination} from './destination';

/**
 * @param data
 * @constructor
 */

class FileImportSpecification {
  constructor(data) {


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
  deserialize(data) {

    this.sourceUrl = data.sourceUrl;
    this.destination = new Destination(data.destination);
  }

}


/**
 * @type {FileImportSpecification}
 */
export default FileImportSpecification;
export {FileImportSpecification};
