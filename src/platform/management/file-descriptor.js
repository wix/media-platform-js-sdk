/**
 * @constructor
 */
function FileDescriptor(data) {

    /**
     * @description a system assigned unique id
     * @type {string}
     */
    this.id = null;

    /**
     * @description the file content hash (null for folders)
     * @type {string}
     */
    this.hash = null;

    /**
     * @description the file location
     * @type {string}
     */
    this.path = null;

    /**
     * @description the file mime type
     * @type {string}
     */
    this.mimeType = null;

    /**
     * @description the file type category
     * @type {string}
     */
    this.mediaType = null;

    /**
     * @description file or directory
     * @type {string}
     */
    this.type = null;

    /**
     * @description the file size (content-length) in bytes, null for folders
     * @type {number}
     */
    this.size = null;

    /**
     * @description extracted metadata, contents depends on the file type
     * @type {{}}
     */
    this.metadata = {};

    /**
     * @type {Array<string>}
     */
    this.tags = [];

    /**
     * @type {string}
     */
    this.dateCreated = null;

    /**
     * @type {string}
     */
    this.dateUpdated = null;

    if (data) {
        this.deserialize(data);
    }
}

FileDescriptor.prototype.deserialize = function (data) {
    this.id = data.id;
    this.hash = data.hash;
    this.path = data.path;
    this.mimeType = data.mimeType;
    this.mediaType = data.mediaType;
    this.type = data.type;
    this.size = data.size;
    this.metadata = data.metadata;
    this.tags = data.tags;
    this.dateCreated = data.dateCreated;
    this.dateUpdated = data.dateUpdated;
};

/**
 * @type {FileDescriptor}
 */
module.exports = FileDescriptor;
