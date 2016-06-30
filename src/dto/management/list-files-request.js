/**
 * @constructor
 */
function ListFilesRequest() {

    /**
     * @type {string|null}
     */
    this.cursor = null;

    /**
     * @type {number|null}
     */
    this.size = 20;

    /**
     * @type {string|null}
     */
    this.order = null;

    /**
     * @type {string|null}
     */
    this.orderDirection = null;

    /**
     * @type {string|null}
     */
    this.parentFolderId = null;

    /**
     * @type {string|null}
     */
    this.mediaType = null;

    /**
     * @type {string|null}
     */
    this.tag = null;
}

/**
 * @param {string} cursor
 * @returns {ListFilesRequest}
 */
ListFilesRequest.prototype.setCursor = function (cursor) {
    this.cursor = cursor;
    return this;
};

/**
 * @param {number} size
 * @returns {ListFilesRequest}
 */
ListFilesRequest.prototype.setSize = function (size) {
    this.size = size;
    return this;
};

/**
 * @param {string} order name or date
 * @returns {ListFilesRequest}
 */
ListFilesRequest.prototype.orderBy = function (order) {
    this.order = order;
    return this;
};

/**
 * @returns {ListFilesRequest}
 */
ListFilesRequest.prototype.asecending = function () {
    this.orderDirection = null;
    return this;
};

/**
 * @returns {ListFilesRequest}
 */
ListFilesRequest.prototype.descending = function () {
    this.orderDirection = '-';
    return this;
};

/**
 * @param {string} parentFolderId
 * @returns {ListFilesRequest}
 */
ListFilesRequest.prototype.setParentFolderId = function (parentFolderId) {
    this.parentFolderId = parentFolderId;
    return this;
};

/**
 * @param {string} mediaType
 * @returns {ListFilesRequest}
 */
ListFilesRequest.prototype.setMediaType = function (mediaType) {
    this.mediaType = mediaType;
    return this;
};

/**
 * @param {string} tag
 * @returns {ListFilesRequest}
 */
ListFilesRequest.prototype.setTag = function (tag) {
    this.tag = tag;
    return this;
};

/**
 * @returns {{cursor: *, page_size: (number|null|number|*), order: null, parent_folder_id: (string|*|string|null), media_type: (string|*|string|null), tag: *}}
 */
ListFilesRequest.prototype.toParams = function () {
    return {
        cursor: this.cursor,
        page_size: this.size,
        order: this.order ? (this.orderDirection ? this.orderDirection : '') + this.order : null,
        parent_folder_id: this.parentFolderId,
        media_type: this.mediaType,
        tag: this.tag
    }
};

/**
 * @type {ListFilesRequest}
 */
module.exports = ListFilesRequest;

// GET /files/getpage?cursor={cursor}&page_size={}&order={order}&parent_folder_id={parent_folder_id}&media_type={media_type}&tag={tag}