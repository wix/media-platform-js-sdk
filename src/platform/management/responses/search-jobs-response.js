import {Job} from '../job/job';

/**
 * @constructor
 */
function SearchJobsResponse(data) {

  /**
   * @type {string}
   */
  this.nextPageToken = null;

  /**
   * @type {Array<Job>}
   */
  this.jobs = [];

  if (data) {
    this.deserialize(data);
  }
}

/**
 * @param data
 * @private
 */
SearchJobsResponse.prototype.deserialize = function (data) {
  this.nextPageToken = data.nextPageToken;
  this.jobs = data.jobs.map(function (job) {
    return new Job(job)
  });
};

/**
 * @type {SearchJobsResponse}
 */
export default SearchJobsResponse;
export {SearchJobsResponse};
