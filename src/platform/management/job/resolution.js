/**
 * @param data
 * @constructor
 */
function Resolution(data) {

  /**
   * @type {number}
   */
  this.width = null;

  /**
   * @type {number}
   */
  this.height = null;

  if (data) {
    this.deserialize(data);
  }
}

/**
 * @param data
 * @private
 */
Resolution.prototype.deserialize = function (data) {
  this.width = data.width;
  this.height = data.height;
};

/**
 * @type {Resolution}
 */
export default Resolution;
export {Resolution};
