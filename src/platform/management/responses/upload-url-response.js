/**
 * @constructor
 */

class UploadUrlResponse {
  constructor(data) {


    /**
     * @type {string}
     */
    this.uploadToken = null;

    /**
     * @type {string}
     */
    this.uploadUrl = null;

    if (data) {
      this.deserialize(data);
    }
  }


  /**
   * @param data
   * @private
   */
  deserialize(data) {

    this.uploadToken = data.uploadToken;
    this.uploadUrl = data.uploadUrl;
  }

}


/**
 * @type {UploadUrlResponse}
 */
export default UploadUrlResponse;
export {UploadUrlResponse};
