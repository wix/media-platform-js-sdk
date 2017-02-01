/**
 * @constructor
 * TODO: if data - populate properties
 */
function ListFilesResponse(data) {

    /**
     * @type {number}
     */
    this.count = null;

    /**
     * @type {string}
     */
    this.cursor = null;

    /**
     * @type {Array<FileDescriptor>}
     */
    this.files = [];
}

/**
 * @type {ListFilesResponse}
 */
module.exports = ListFilesResponse;