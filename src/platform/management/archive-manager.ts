import {IJob, Job} from './job/job';
import {Configuration} from '../configuration/configuration';
import {Configuration as BrowserConfiguration} from '../../public/platform/configuration/configuration';
import {IHTTPClient} from '../http/http-client';
import {CreateArchiveRequest} from './requests/create-archive-request';
import {ExtractArchiveRequest} from './requests/extract-archive-request';
import {deprecatedFn} from '../../utils/deprecated/deprecated';
import {RawResponse} from '../../types/response/response';

export type ArchiveCallback = (error: Error | null, job: Job | null) => void;

/**
 * Archive Manager
 * @doc ArchiveManager
 */
export class ArchiveManager {
  public baseUrl: string;

  constructor(public configuration: Configuration | BrowserConfiguration, public httpClient: IHTTPClient) {
    this.baseUrl = 'https://' + configuration.domain;
  }

  /**
   * @param {CreateArchiveRequest?} createArchiveRequest
   * @param {function(Error, Job)} callback DEPRECATED! use promise response instead
   */
  createArchive(createArchiveRequest?: CreateArchiveRequest | undefined, callback?: ArchiveCallback): Promise<Job> {
    if (callback) {
      callback = deprecatedFn('ArchiveManager.createArchive: use promise response instead')(callback);
    }
    return this.httpClient
      .post<RawResponse<IJob>>(this.baseUrl + '/_api/archive/create', createArchiveRequest)
      .then(response => {
        const job = new Job(response.payload);
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
   * @param {ExtractArchiveRequest?} extractArchiveRequest
   * @param {function(Error, Job)} callback DEPRECATED! use promise response instead
   */
  extractArchive(extractArchiveRequest: ExtractArchiveRequest, callback?: ArchiveCallback): Promise<Job> {
    if (callback) {
      callback = deprecatedFn('ArchiveManager.extractArchive: use promise response instead')(callback);
    }
    return this.httpClient
      .post<RawResponse<IJob>>(this.baseUrl + '/_api/archive/extract', extractArchiveRequest)
      .then(response => {
        const job = new Job(response.payload);
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
}
