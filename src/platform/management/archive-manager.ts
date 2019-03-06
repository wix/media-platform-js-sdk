import * as Observable from 'zen-observable';

import { Configuration as BrowserConfiguration } from '../../public/platform/configuration/configuration';
import { RawResponse } from '../../types/response/response';
import { Configuration } from '../configuration/configuration';
import { IHTTPClient } from '../http/http-client';

import { CreateArchiveSpecification } from './job/create-archive-specification';
import { ExtractArchiveSpecification } from './job/extract-archive-specification';
import { IJob, Job } from './job/job';
import { observeJobCreator } from './job/job-observable';
import {
  CreateArchiveRequest,
  ICreateArchiveRequest,
} from './requests/create-archive-request';
import {
  ExtractArchiveRequest,
  IExtractArchiveRequest,
} from './requests/extract-archive-request';

/**
 * Archive Manager. Lets create and extract archives
 * @doc ArchiveManager
 */
export class ArchiveManager {
  public baseUrl: string;

  constructor(
    public configuration: Configuration | BrowserConfiguration,
    public httpClient: IHTTPClient,
  ) {
    this.baseUrl = 'https://' + configuration.domain;
  }

  /**
   * @param {CreateArchiveRequest?} createArchiveRequest
   * @returns {Promise<Job<CreateArchiveSpecification>>}
   */
  createArchive(
    createArchiveRequest?: ICreateArchiveRequest,
  ): Promise<Job<CreateArchiveSpecification>> {
    return this.httpClient
      .post<RawResponse<IJob<CreateArchiveSpecification>>>(
        `${this.baseUrl}/_api/archive/create`,
        createArchiveRequest,
      )
      .then(
        response => {
          return new Job<CreateArchiveSpecification>(response.payload);
        },
        error => {
          return Promise.reject(error);
        },
      );
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
  createArchiveObservable(
    createArchiveRequest: ICreateArchiveRequest,
  ): Observable<Job<CreateArchiveSpecification>> {
    return observeJobCreator<CreateArchiveSpecification>(
      this.configuration,
      this.httpClient,
    )(() => this.createArchive(createArchiveRequest));
  }

  private doExtractArchive(
    extractArchiveRequest: IExtractArchiveRequest,
  ): Promise<RawResponse<IJob<ExtractArchiveSpecification>>> {
    return this.httpClient.post<RawResponse<IJob<ExtractArchiveSpecification>>>(
      `${this.baseUrl}/_api/archive/extract`,
      extractArchiveRequest,
    );
  }

  extractArchiveObservable(
    extractArchiveRequest: IExtractArchiveRequest,
  ): Observable<Job<ExtractArchiveSpecification>> {
    return observeJobCreator<ExtractArchiveSpecification>(
      this.configuration,
      this.httpClient,
    )(() => this.extractArchive(extractArchiveRequest));
  }

  /**
   * @param {ExtractArchiveRequest?} extractArchiveRequest
   * @returns {Promise<Job<ExtractArchiveSpecification>>}
   */
  extractArchive(
    extractArchiveRequest: IExtractArchiveRequest,
  ): Promise<Job<ExtractArchiveSpecification>> {
    return this.doExtractArchive(extractArchiveRequest).then(
      response => {
        return new Job<ExtractArchiveSpecification>(response.payload);
      },
      error => {
        return Promise.reject(error);
      },
    );
  }
}
