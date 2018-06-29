import {CreateArchiveSpecification} from './job/create-archive-specification';
import {ExtractArchiveSpecification} from './job/extract-archive-specification';
import {IJob, Job} from './job/job';
import {Configuration} from '../configuration/configuration';
import {Configuration as BrowserConfiguration} from '../../public/platform/configuration/configuration';
import {IHTTPClient} from '../http/http-client';
import {CreateArchiveRequest, ICreateArchiveRequest} from './requests/create-archive-request';
import {ExtractArchiveRequest, IExtractArchiveRequest} from './requests/extract-archive-request';
import {deprecatedFn} from '../../utils/deprecated/deprecated';
import {RawResponse} from '../../types/response/response';
import Observable from 'zen-observable';
import {observeJobCreator} from './job/job-observable';

export type ArchiveCallback<T> = (error: Error | null, job: Job<T> | null) => void;

/**
 * Archive Manager. Lets create and extract archives
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
  createArchive(createArchiveRequest?: ICreateArchiveRequest | undefined, callback?: ArchiveCallback<CreateArchiveSpecification>): Promise<Job<CreateArchiveSpecification>> {
    if (callback) {
      callback = deprecatedFn('ArchiveManager.createArchive: use promise response instead')(callback);
    }
    return this.httpClient
      .post<RawResponse<IJob<CreateArchiveSpecification>>>(`${this.baseUrl}/_api/archive/create`, createArchiveRequest)
      .then(response => {
        const job = new Job<CreateArchiveSpecification>(response.payload);
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
   *
   * @param {IExtractArchiveRequest} createArchiveRequest
   * @returns {Observable<CreateArchiveSpecification>}
   *
   * @example
   * archiveManager
   *   .createArchiveObservable({
   *     source: {
   *       fileId: '#file-id
   *     },
   *     destination: {
   *       path: '/demo/path',
   *       acl: 'public'
   *     }
   *   })
   *   .subscribe(job => {
   *     console.log(job.status);
   *   });
   */
  createArchiveObservable(createArchiveRequest: ICreateArchiveRequest): Observable<Job<CreateArchiveSpecification>> {
    return observeJobCreator<CreateArchiveSpecification>(this.configuration, this.httpClient)(
      () => this.createArchive(createArchiveRequest)
    );
  }

  private doExtractArchive(extractArchiveRequest: IExtractArchiveRequest): Promise<RawResponse<IJob<ExtractArchiveSpecification>>> {
    return this.httpClient
      .post<RawResponse<IJob<ExtractArchiveSpecification>>>(`${this.baseUrl}/_api/archive/extract`, extractArchiveRequest)
  }

  extractArchiveObservable(extractArchiveRequest: IExtractArchiveRequest): Observable<Job<ExtractArchiveSpecification>> {
    return observeJobCreator<ExtractArchiveSpecification>(this.configuration, this.httpClient)(
      () => this.extractArchive(extractArchiveRequest)
    );
  }

  /**
   * @param {ExtractArchiveRequest?} extractArchiveRequest
   * @param {function(Error, Job)} callback DEPRECATED! use promise response instead
   */
  extractArchive(extractArchiveRequest: IExtractArchiveRequest, callback?: ArchiveCallback<ExtractArchiveSpecification>): Promise<Job<ExtractArchiveSpecification>> {
    if (callback) {
      callback = deprecatedFn('ArchiveManager.extractArchive: use promise response instead')(callback);
    }
    return this.doExtractArchive(extractArchiveRequest)
      .then(response => {
        const job = new Job<ExtractArchiveSpecification>(response.payload);
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
