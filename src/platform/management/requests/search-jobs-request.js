/**
 * @constructor
 */

class SearchJobsRequest {
  constructor() {


    /**
     * @type {string}
     */
    this.nextPageToken = null;

    /**
     * @type {number}
     */
    this.pageSize = null;

    /**
     * @type {string}
     */
    this.orderBy = null;

    /**
     * @type {string}
     */
    this.orderDirection = null;

    /**
     * @type {string}
     */
    this.issuer = null;

    /**
     * @type {string}
     */
    this.type = null;

    /**
     * @type {string}
     */
    this.status = null;

    /**
     * @type {string}
     */
    this.groupId = null;

    /**
     * @type {string}
     */
    this.fileId = null;

    /**
     * @type {string}
     */
    this.path = null;
  }


  /**
   * @param {string} nextPageToken
   * @returns {SearchJobsRequest}
   */
  setNextPageToken(nextPageToken) {

    this.nextPageToken = nextPageToken;
    return this;
  }


  /**
   * @param {number} pageSize
   * @returns {SearchJobsRequest}
   */
  setPageSize(pageSize) {

    this.pageSize = pageSize;
    return this;
  }


  /**
   * @param {string} orderBy name or date
   * @returns {SearchJobsRequest}
   */
  setOrderBy(orderBy) {

    this.orderBy = orderBy;
    return this;
  }


  /**
   * @returns {SearchJobsRequest}
   */
  ascending() {

    this.orderDirection = 'acs';
    return this;
  }


  /**
   * @returns {SearchJobsRequest}
   */
  descending() {

    this.orderDirection = 'des';
    return this;
  }


  /**
   * @param {string} job type
   * @returns {SearchJobsRequest}
   */
  setType(type) {

    this.type = type;
    return this;
  }


  /**
   * @param {string} job status (pending, success etc.)
   * @returns {SearchJobsRequest}
   */
  setStatus(status) {

    this.status = status;
    return this;
  }


  /**
   * @param {string} job group ID
   * @returns {SearchJobsRequest}
   */
  setGroupId(groupId) {

    this.groupId = groupId;
    return this;
  }


  /**
   * @param {string} file ID of the job's source file
   * @returns {SearchJobsRequest}
   */
  setFileId(fileId) {

    this.fileId = fileId;
    return this;
  }


  /**
   * @param {string} path of the job's source file
   * @returns {SearchJobsRequest}
   */
  setPath(path) {

    this.path = path;
    return this;
  }

}


/**
 * @type {SearchJobsRequest}
 */
export default SearchJobsRequest;
export {SearchJobsRequest};
