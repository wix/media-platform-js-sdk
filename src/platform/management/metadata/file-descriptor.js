/**
 * @param data
 * @constructor
 */

class FileDescriptor {
  constructor(data) {


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
     * @description whether the file has public access or not
     * @type {string}
     */
    this.acl = null;

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


  /**
   * @param data
   * @private
   */
  deserialize(data) {

    this.id = data.id;
    this.hash = data.hash;
    this.path = data.path;
    this.mimeType = data.mimeType;
    this.type = data.type;
    this.size = data.size;
    this.acl = data.acl;
    this.dateCreated = data.dateCreated;
    this.dateUpdated = data.dateUpdated;
  }

}


/**
 * @type {FileDescriptor}
 */
export default FileDescriptor;
export {FileDescriptor};
