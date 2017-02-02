var FileDescriptor = require('../file-descriptor');

/**
 * @constructor
 */
function ListFilesResponse(data) {

    /**
     * @type {number}
     */
    this.pageSize = null;

    /**
     * @type {number}
     */
    this.total = null;

    /**
     * @type {string}
     */
    this.nextPageCursor = null;

    /**
     * @type {Array<FileDescriptor>}
     */
    this.files = [];

    if (data) {
        this.deserialize(data);
    }
}

ListFilesResponse.prototype.deserialize = function (data) {
    this.pageSize = data.pageSize;
    this.nextPageCursor = data.nextPageCursor;
    this.total = data.total;
    this.files = data.files.map(function (file) {
        return new FileDescriptor(file)
    });
};

/**
 * @type {ListFilesResponse}
 */
module.exports = ListFilesResponse;