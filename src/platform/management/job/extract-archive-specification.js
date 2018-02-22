import {Source} from './source';
import {Destination} from './destination';

/**
 * @param data
 * @constructor
 */

class ExtractArchiveSpecification {
  constructor(data) {


    /**
     * @type {Source}
     */
    this.source = null;

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

    this.sources = new Source(data.source);
    this.destination = new Destination(data.destination);
  }

}


/**
 * @type {ExtractArchiveSpecification}
 */
export default ExtractArchiveSpecification;
export {ExtractArchiveSpecification};
