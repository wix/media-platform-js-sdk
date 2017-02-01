/**
 * @constructor
 * TODO: if data - populate properties
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
}

/**
 * @type {FileDescriptor}
 */
module.exports = FileDescriptor;
