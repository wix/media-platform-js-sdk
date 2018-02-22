/**
 * @param data
 * @constructor
 */

class QualityRange {
  constructor(data) {


    /**
     * @type {string}
     */
    this.minimum = null;

    /**
     * @type {string}
     */
    this.maximum = null;

    if (data) {
      this.deserialize(data);
    }
  }


  /**
   * @param {string} minimum
   * @returns {QualityRange}
   */
  setMinimum(minimum) {

    this.minimum = minimum;
    return this;
  }


  /**
   * @param {string} maximum
   * @returns {QualityRange}
   */
  setMaximum(maximum) {

    this.maximum = maximum;
    return this;
  }


  /**
   * @param data
   * @private
   */
  deserialize(data) {

    this.minimum = data.minimum;
    this.maximum = data.maximum;
  }

}


/**
 * @type {QualityRange}
 */
export default QualityRange;
export {QualityRange};
