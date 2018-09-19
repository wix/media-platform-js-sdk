import {RawResponse} from '../../types/response/response';
import {deprecatedFn} from '../../utils/deprecated/deprecated';
import {IConfigurationBase} from '../configuration/configuration';
import {IHTTPClient} from '../http/http-client';
import {IJob, Job} from './job/job';
import {ISearchJobsResponse, SearchJobsResponse} from './responses/search-jobs-response';

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
   * @returns {Promise<Job<T>>}
   */
  getJob<T = any>(jobId: string): Promise<Job<T>> {
    return this.httpClient.get<RawResponse<IJob<T>>>(`${this.apiUrl}/${jobId}`)
      .then((response) => {
        return new Job<T>(response.payload);
      }, error => {
        return Promise.reject(error);
      });
  }

  /**
   * @param {string} groupId
   * @returns {Promise<Job<T>[]}
   */
  getJobGroup<T = any>(groupId: string): Promise<Job<T>[]> {
    // TODO: convert Job<any>[] to a more typed solution
    // For this will need to move specifications to discriminated unions

    return this.httpClient
      .get<RawResponse<IJob<any>[]>>(`${this.apiUrl}/groups/${groupId}`, {})
      .then((response) => {
        return response.payload.map(data => new Job(data));
      }, error => {
        return Promise.reject(error);
      });
  }

  /**
   * @param {SearchJobsRequest} searchJobsRequest
   * @returns {Promise<SearchJobsResponse>}
   */
  searchJobs(searchJobsRequest): Promise<SearchJobsResponse> {
    const params = {...searchJobsRequest};

    return this.httpClient
      .get<RawResponse<ISearchJobsResponse>>(this.apiUrl, params)
      .then((response) => {
        return new SearchJobsResponse(response.payload);
      }, error => {
        return Promise.reject(error);
      });
  }
}
