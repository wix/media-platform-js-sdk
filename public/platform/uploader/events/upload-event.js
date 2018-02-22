/**
 * @param {UploadJob} target
 * @param {object?} response
 * @constructor
 * @protected
 */

class UploadEvent {
  constructor(target, response) {
    /**
     * @type {string}
     */
    this.name = '';

    /**
     * @type {UploadJob}
     */
    this.target = target;

    /**
     * @type {object || null}
     */
    this.response = response;
  }
}

/**
 * @type {UploadEvent}
 */
export default UploadEvent;
export {UploadEvent};
