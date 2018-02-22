import {Source} from './source';
import {Destination} from './destination';

/**
 * @param data
 * @constructor
 */

class CreateArchiveSpecification {
  constructor(data) {


    /**
     * @type {array}
     */
    this.sources = null;

    /**
     * @type {Destination}
     */
    this.destination = null;

    /**
     * @type {string}
     */
    this.archiveType = null;

    if (data) {
      this.deserialize(data);
    }
  }


  /**
   * @param data
   * @private
   */
  deserialize(data) {

    this.sources = data.sources.map(function (source) {
      return new Source(source)
    });
    this.destination = new Destination(data.destination);
    this.archiveType = data.archiveType;

  }

}


/**
 * @type {CreateArchiveSpecification}
 */
export default CreateArchiveSpecification;
export {CreateArchiveSpecification};
