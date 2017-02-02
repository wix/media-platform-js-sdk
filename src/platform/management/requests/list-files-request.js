/**
 * @constructor
 */
function ListFilesRequest() {

    /**
     * @type {string}
     */
    this.path = path;

    /**
     * @type {string|null}
     */
    this.cursor = null;

    /**
     * @type {number|null}
     */
    this.pageSize = 20;

    /**
     * @type {string|null}
     */
    this.orderBy = null;

    /**
     * @type {string|null}
     */
    this.orderDirection = null;
}

/**
 * @param {string} path
 * @returns {ListFilesRequest}
 */
ListFilesRequest.prototype.path = function (path) {
    this.path = path;
    return this;
};

/**
 * @param {string} cursor
 * @returns {ListFilesRequest}
 */
ListFilesRequest.prototype.setCursor = function (cursor) {
    this.cursor = cursor;
    return this;
};

/**
 * @param {number} pageSize
 * @returns {ListFilesRequest}
 */
ListFilesRequest.prototype.setSize = function (pageSize) {
    this.pageSize = pageSize;
    return this;
};

/**
 * @param {string} orderBy name or date
 * @returns {ListFilesRequest}
 */
ListFilesRequest.prototype.orderBy = function (orderBy) {
    this.orderBy = orderBy;
    return this;
};

/**
 * @returns {ListFilesRequest}
 */
ListFilesRequest.prototype.ascending = function () {
    this.orderDirection = 'acs';
    return this;
};

/**
 * @returns {ListFilesRequest}
 */
ListFilesRequest.prototype.descending = function () {
    this.orderDirection = 'des';
    return this;
};


/**
 * @type {ListFilesRequest}
 */
module.exports = ListFilesRequest;