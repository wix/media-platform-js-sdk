/**
 * @constructor
 */
function ListFilesRequest() {

  /**
   * @type {string|null}
   */
  this.nextPageToken = null;

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
 * @param {string} cursor
 * @returns {ListFilesRequest}
 * @deprecated incorrect param name, use setNextPageToken
 */
ListFilesRequest.prototype.setCursor = function (cursor) {
  this.nextPageToken = cursor;
  return this;
};

/**
 * @param {string} nextPageToken
 * @returns {ListFilesRequest}
 */
ListFilesRequest.prototype.setNextPageToken = function (nextPageToken) {
  this.nextPageToken = nextPageToken;
  return this;
};

/**
 * @param {number} pageSize
 * @returns {ListFilesRequest}
 */
ListFilesRequest.prototype.setPageSize = function (pageSize) {
  this.pageSize = pageSize;
  return this;
};

/**
 * @param {string} orderBy name or date
 * @returns {ListFilesRequest}
 */
ListFilesRequest.prototype.setOrderBy = function (orderBy) {
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
export {ListFilesRequest};
