import _ from 'underscore';
import {Job} from './job/job';
import {SearchJobsResponse} from './responses/search-jobs-response';

/**
 * @param {Configuration} configuration
 * @param {HTTPClient} httpClient
 * @constructor
 */
function JobManager(configuration, httpClient) {

  /**
   * @type {Configuration}
   */
  this.configuration = configuration;

  /**
   * @type {HTTPClient}
   */
  this.httpClient = httpClient;

  /**
   * @type {string}
   */
  this.baseUrl = 'https://' + configuration.domain;

  /**
   * @type {string}
   */
  this.apiUrl = this.baseUrl + '/_api/jobs';

}

/**
 * @param {string} jobId
 * @param {function(Error, Job)} callback
 */
JobManager.prototype.getJob = function (jobId, callback) {
  this.httpClient.request('GET', this.apiUrl + '/' + jobId, {}, null, function (error, response) {

    if (error) {
      callback(error, null);
      return;
    }

    callback(null, new Job(response.payload));
  });
};

/**
 * @param {string} groupId
 * @param {function(Error, Array<Job>)} callback
 */
JobManager.prototype.getJobGroup = function (groupId, callback) {
  this.httpClient.request('GET', this.apiUrl + '/groups/' + groupId, {}, null, function (error, response) {

    if (error) {
      callback(error, null);
      return;
    }

    var jobs = response.payload.map(function (data) {
      return new Job(data);
    });

    callback(null, jobs);
  });
};

/**
 * @param {SearchJobsRequest} searchJobsRequest
 * @param {function(Error, SearchJobsResponse)} callback
 */
JobManager.prototype.searchJobs = function (searchJobsRequest, callback) {

  var params = {};
  _.extendOwn(params, searchJobsRequest);

  this.httpClient.request('GET', this.apiUrl, params, null, function (error, response) {

    if (error) {
      callback(error, null);
      return;
    }

    callback(null, new SearchJobsResponse(response.payload));
  });
};

/**
 * @type {JobManager}
 */
export default JobManager;
export {JobManager};
