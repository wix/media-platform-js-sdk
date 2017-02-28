var FileDescriptor = require('../metadata/file-descriptor');

/**
 * @constructor
 */
function ListFilesResponse(data) {

    /**
     * @type {string}
     */
    this.nextPageToken = null;

    /**
     * @type {Array<FileDescriptor>}
     */
    this.files = [];

    if (data) {
        this.deserialize(data);
    }
}

/**
 * @param data
 * @private
 */
ListFilesResponse.prototype.deserialize = function (data) {
    this.nextPageToken = data.nextPageToken;
    this.files = data.files.map(function (file) {
        return new FileDescriptor(file)
    });
};

/**
 * @type {ListFilesResponse}
 */
module.exports = ListFilesResponse;