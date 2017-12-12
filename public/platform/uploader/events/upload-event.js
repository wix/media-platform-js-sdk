/**
 * @param {UploadJob} target
 * @param {Response} response
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
     * @type {Response}
     */
    this.response = response;
}

/**
 * @type {UploadEvent}
 */
module.exports = UploadEvent;