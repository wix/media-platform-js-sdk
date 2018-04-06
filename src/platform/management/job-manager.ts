import {Job} from './job/job';
import {SearchJobsResponse} from './responses/search-jobs-response';
import {IConfigurationBase} from '../configuration/configuration';
import {IHTTPClient} from '../http/http-client';

/**
 * @param {Configuration} configuration
 * @param {HTTPClient} httpClient
 * @doc JobManager
 */

export class JobManager {
  public baseUrl: string;
  public apiUrl: string;

  constructor(public configuration: IConfigurationBase, public httpClient: IHTTPClient) {
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
  getJob(jobId, callback: (error: Error | null, job: Job | null) => void) {
    this.httpClient.request('GET', this.apiUrl + '/' + jobId, {}, undefined, function (error, response) {
      if (error) {
        callback(error, null);
        return;
      }

      callback(null, new Job(response.payload));
    });
  }

  /**
   * @param {string} groupId
   * @param {function(Error, Array<Job>)} callback
   */
  getJobGroup(groupId, callback: (error: Error | null, job: Job[] | null) => void) {
    this.httpClient.request('GET', this.apiUrl + '/groups/' + groupId, {}, undefined, function (error, response) {
      if (error) {
        callback(error, null);
        return;
      }

      const jobs = response.payload.map(function (data) {
        return new Job(data);
      });

      callback(null, jobs);
    });
  }

  /**
   * @param {SearchJobsRequest} searchJobsRequest
   * @param {function(Error, SearchJobsResponse)} callback
   */
  searchJobs(searchJobsRequest, callback: (error: Error | null, job: SearchJobsResponse | null) => void) {
    const params = {...searchJobsRequest};

    this.httpClient.request('GET', this.apiUrl, params, undefined, function (error, response) {
      if (error) {
        callback(error, null);
        return;
      }

      callback(null, new SearchJobsResponse(response.payload));
    });
  }
}
