/**
 * @param {UploadJob} target
 * @constructor
 * @protected
 */
function UploadEvent(target) {

    /**
     * @type {string}
     */
    this.name = '';

    /**
     * @type {UploadJob}
     */
    this.target = target;
}

/**
 * @type {UploadEvent}
 */
module.exports = UploadEvent;