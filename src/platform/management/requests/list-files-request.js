/**
 * @constructor
 */

class ListFilesRequest {
  constructor() {


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
  setCursor(cursor) {

    this.nextPageToken = cursor;
    return this;
  }


  /**
   * @param {string} nextPageToken
   * @returns {ListFilesRequest}
   */
  setNextPageToken(nextPageToken) {

    this.nextPageToken = nextPageToken;
    return this;
  }


  /**
   * @param {number} pageSize
   * @returns {ListFilesRequest}
   */
  setPageSize(pageSize) {

    this.pageSize = pageSize;
    return this;
  }


  /**
   * @param {string} orderBy name or date
   * @returns {ListFilesRequest}
   */
  setOrderBy(orderBy) {

    this.orderBy = orderBy;
    return this;
  }


  /**
   * @returns {ListFilesRequest}
   */
  ascending() {

    this.orderDirection = 'acs';
    return this;
  }


  /**
   * @returns {ListFilesRequest}
   */
  descending() {

    this.orderDirection = 'des';
    return this;
  }

}


/**
 * @type {ListFilesRequest}
 */
export {ListFilesRequest};
