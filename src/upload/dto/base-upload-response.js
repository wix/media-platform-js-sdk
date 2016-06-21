/**
 * @constructor
 */
function BaseUploadResponse() {

    this.parentFolderId = null;

    this.hash = null;

    this.fileName = null;

    this.fileUrl = null;

    this.originalFileName = null;

    this.fileSize = null;

    this.mediaType = null;

    this.lables = [];

    this.tags = [];

    this.dateCreated = null;

    this.dateModified = null;
}

module.exports = BaseUploadResponse;