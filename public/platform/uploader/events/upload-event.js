/**
 * @param {UploadJob} target
 * @param {object?} response
 * @constructor
 * @protected
 */
function UploadEvent(target, response) {

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

/**
 * @type {UploadEvent}
 */
module.exports = UploadEvent;