/**
 * @constructor
 */
function BaseDTO() {

    /**
     * @type {string}
     */
    this.parentFolderId = null;

    /**
     * @type {string}
     */
    this.hash = null;

    /**
     * @type {string}
     */
    this.originalFileName = null;

    /**
     * @type {string}
     */
    this.fileName = null;

    /**
     * @type {string}
     */
    this.fileUrl = null;

    /**
     * @type {number}
     */
    this.fileSize = null;

    /**
     * @type {string}
     */
    this.mediaType = null;

    /**
     * @type {string}
     */
    this.mimeType = null;

    /**
     * @type {Array<string>}
     */
    this.lables = [];

    /**
     * @type {Array<string>}
     */
    this.tags = [];

    /**
     * @type {number}
     */
    this.dateCreated = null;

    /**
     * @type {number}
     */
    this.dateModified = null;
}

/**
 * @param {Object} data
 * @protected
 */
BaseDTO.prototype.deserialize = function (data) {
    this.parentFolderId = data.parent_folder_id;
    this.hash = data.hash;
    this.originalFileName = data.original_file_name;
    this.fileName = data.file_name;
    this.fileUrl = data.file_url;
    this.iconUrl = data.icon_url;
    this.fileSize = data.file_size;
    this.mediaType = data.media_type;
    this.mimeType = data.mime_type;
    this.lables = data.labels || [];
    this.tags = data.tags || [];
    this.dateCreated = data.created_ts;
    this.dateModified = data.modified_ts;
};

/**
 * @type {BaseDTO}
 */
module.exports = BaseDTO;

// [
//     {
//         "parent_folder_id": "dc933247458b41792a0fb9d2f2296bb5",
//         "created_ts": 1466345821,
//         "hash": "0a9371085075b9fed4c29b9418804840",
//         "tags": [],
//         "file_name": "10a917_d723da13c9e44213924b582e1d641aaa~mv2.png",
//         "labels": [],
//         "file_url": "media/10a917_d723da13c9e44213924b582e1d641aaa~mv2.png",
//         "height": 17,
//         "width": 17,
//         "original_file_name": "included-icon.png",
//         "modified_ts": 1466345821,
//         "file_size": 842,
//         "media_type": "picture",
//         "icon_url": "media/10a917_d723da13c9e44213924b582e1d641aaa~mv2.png",
//         "mime_type": "image/png"
//     }
// ]