/**
 * @constructor
 */
function UploadUrlResponse(data) {

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
UploadUrlResponse.prototype.deserialize = function (data) {
  this.uploadToken = data.uploadToken;
  this.uploadUrl = data.uploadUrl;
};

/**
 * @type {UploadUrlResponse}
 */
export default UploadUrlResponse;
export {UploadUrlResponse};
