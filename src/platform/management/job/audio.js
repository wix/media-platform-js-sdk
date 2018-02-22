import {AudioSpecification} from './audio-specification';

/**
 * @param data
 * @constructor
 */

class Audio {
  constructor(data) {


    this.specification = null;

    if (data) {
      this.deserialize(data);
    }
  }


  /**
   * @param data
   * @private
   */
  deserialize(data) {

    this.specification = new AudioSpecification(data.specification);
  }

}


/**
 * @type {Audio}
 */
export default Audio;
export {Audio};
