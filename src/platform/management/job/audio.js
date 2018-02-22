import {AudioSpecification} from './audio-specification';

/**
 * @param data
 * @constructor
 */
function Audio(data) {

  this.specification = null;

  if (data) {
    this.deserialize(data);
  }
}

/**
 * @param data
 * @private
 */
Audio.prototype.deserialize = function (data) {
  this.specification = new AudioSpecification(data.specification);
};

/**
 * @type {Audio}
 */
export default Audio;
export {Audio};
