/**
 * @constructor
 */
function UpdateFileRequest() {
    /**
     * @type {Array<string>}
     */
    this.tags = [];
}


/**
 * @param {Array<string>} tags
 * @returns {UpdateFileRequest}
 */
UpdateFileRequest.prototype.setTags = function (tags) {
    this.tags = tags;
    return this;
};

/**
 * @type {UpdateFileRequest}
 */
module.exports = UpdateFileRequest;
