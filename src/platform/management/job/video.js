import {VideoSpecification} from './video-specification';

/**
 * @param data
 * @constructor
 */
function Video(data) {

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
Video.prototype.setSpecification = function (specification) {
  this.specification = specification;
  return this;
};

/**
 * @param data
 * @private
 */
Video.prototype.deserialize = function (data) {
  this.specification = new VideoSpecification(data.specification);
};

/**
 * @type {Video}
 */
export default Video;
export {Video};
