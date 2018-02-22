import {Destination} from './destination';
import {Video} from './video';
import {Audio} from './audio';
import {QualityRange} from './quality-range';

/**
 * @param data
 * @constructor
 */

class TranscodeSpecification {
  constructor(data) {
    /**
     * @type {Destination}
     */
    this.destination = null;

    /**
     * @type {string}
     */
    this.quality = null;

    /**
     * @type {QualityRange}
     */
    this.qualityRange = null;

    /**
     * @type {Video}
     */
    this.video = null;

    /**
     * @type {Audio}
     */
    this.audio = null;

    if (data) {
      this.deserialize(data);
    }
  }

  /**
   * @param {Destination} destination
   * @returns {TranscodeSpecification}
   */
  setDestination(destination) {
    this.destination = destination;
    return this;
  }

  /**
   * @param {QualityRange} qualityRange
   * @returns {TranscodeSpecification}
   */
  setQualityRange(qualityRange) {
    this.qualityRange = qualityRange;
    return this;
  }

  /**
   * @param data
   * @private
   */
  deserialize(data) {
    this.destination = new Destination(data.destination);
    this.quality = data.quality;
    this.qualityRange = new QualityRange(data.qualityRange);
    this.video = new Video(data.video);
    this.audio = new Audio(data.audio);
  }
}

/**
 * @type {TranscodeSpecification}
 */
export default TranscodeSpecification;
export {TranscodeSpecification};
