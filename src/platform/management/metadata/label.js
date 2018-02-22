/**
 * @constructor
 */
function Label(data) {

  /**
   * @type {string}
   */
  this.name = null;

  /**
   * @type {number}
   */
  this.score = null;

  if (data) {
    this.deserialize(data);
  }
}

/**
 * @param data
 * @private
 */
Label.prototype.deserialize = function (data) {
  this.name = data.name;
  this.score = data.score;
};

/**
 * @type {Label}
 */
export default Label;
export {Label};



