/**
 * @constructor
 */
function SearchJobsRequest() {

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
SearchJobsRequest.prototype.setNextPageToken = function (nextPageToken) {
    this.nextPageToken = nextPageToken;
    return this;
};

/**
 * @param {number} pageSize
 * @returns {SearchJobsRequest}
 */
SearchJobsRequest.prototype.setPageSize = function (pageSize) {
    this.pageSize = pageSize;
    return this;
};

/**
 * @param {string} orderBy name or date
 * @returns {SearchJobsRequest}
 */
SearchJobsRequest.prototype.setOrderBy = function (orderBy) {
    this.orderBy = orderBy;
    return this;
};

/**
 * @returns {SearchJobsRequest}
 */
SearchJobsRequest.prototype.ascending = function () {
    this.orderDirection = 'acs';
    return this;
};

/**
 * @returns {SearchJobsRequest}
 */
SearchJobsRequest.prototype.descending = function () {
    this.orderDirection = 'des';
    return this;
};


/**
 * @type {SearchJobsRequest}
 */
module.exports = SearchJobsRequest;