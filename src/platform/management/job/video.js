import {VideoSpecification} from './video-specification';

/**
 * @param data
 * @constructor
 */

class Video {
  constructor(data) {


    /**
     * @type {VideoSpecification}
     */
    this.specification = null;

    if (data) {
      this.deserialize(data);
    }
  }


  /**
   * @param {VideoSpecification} specification
   * @returns {Video}
   */
  setSpecification(specification) {

    this.specification = specification;
    return this;
  }


  /**
   * @param data
   * @private
   */
  deserialize(data) {

    this.specification = new VideoSpecification(data.specification);
  }

}


/**
 * @type {Video}
 */
export default Video;
export {Video};
