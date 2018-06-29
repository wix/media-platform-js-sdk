import {IJob, Job} from './job/job';
import {ISearchJobsResponse, SearchJobsResponse} from './responses/search-jobs-response';
import {IConfigurationBase} from '../configuration/configuration';
import {IHTTPClient} from '../http/http-client';
import {RawResponse} from '../../types/response/response';
import {deprecatedFn} from '../../utils/deprecated/deprecated';

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
    this.apiUrl = `${this.baseUrl}/_api/jobs`;
  }

  /**
   * @param {string} jobId
   * @param {function(Error, Job)} callback DEPRECATED! use promise response instead
   */
  getJob<T = any>(jobId, callback?: (error: Error | null, job: Job<T> | null) => void): Promise<Job<T>> {
    if (callback) {
      callback = deprecatedFn('JobManager.getJob use promise response instead')(callback);
    }
    return this.httpClient.get<RawResponse<IJob<T>>>(`${this.apiUrl}/${jobId}`)
      .then((response) => {
        const job = new Job<T>(response.payload);
        if (callback) {
          callback(null, job);
        }
        return job;
      }, error => {
        if (callback) {
          callback(error, null);
        }
        return Promise.reject(error);
      });
  }

  /**
   * @param {string} groupId
   * @param {function(Error, Job[])} callback DEPRECATED! use promise response instead
   */
  getJobGroup<T = any>(groupId, callback?: (error: Error | null, job: Job<any>[] | null) => void): Promise<Job<any>[]> {
    // TODO: convert Job<any>[] to a more typed solution
    // For this will need to move specifications to discriminated unions
    if (callback) {
      callback = deprecatedFn('JobManager.getJobGroup use promise response instead')(callback);
    }
    return this.httpClient
      .get<RawResponse<IJob<any>[]>>(`${this.apiUrl}/groups/${groupId}`, {})
      .then((response) => {
        const jobs = response.payload.map(data => new Job(data));

        if (callback) {
          callback(null, jobs);
        }
        return jobs;
      }, error => {
        if (callback) {
          callback(error, null);
        }
        return Promise.reject(error);
      });
  }

  /**
   * @param {SearchJobsRequest} searchJobsRequest
   * @param {function(Error, SearchJobsResponse)} callback DEPRECATED! use promise response instead
   */
  searchJobs(searchJobsRequest, callback?: (error: Error | null, job: SearchJobsResponse | null) => void): Promise<SearchJobsResponse> {
    const params = {...searchJobsRequest};
    if (callback) {
      callback = deprecatedFn('JobManager.searchJobs use promise response instead')(callback);
    }

    return this.httpClient
      .get<RawResponse<ISearchJobsResponse>>(this.apiUrl, params)
      .then((response) => {
        const searchJobsResponse = new SearchJobsResponse(response.payload);

        if (callback) {
          callback(null, searchJobsResponse);
        }

        return searchJobsResponse;
      }, error => {
        if (callback) {
          callback(error, null);
        }

        return Promise.reject(error);
      });
  }
}
