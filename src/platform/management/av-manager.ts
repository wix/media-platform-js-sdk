import * as Observable from 'zen-observable';

import {ACL} from '../../types/media-platform/media-platform';
import {RawResponse} from '../../types/response/response';
import {IConfigurationBase} from '../configuration/configuration';
import {IHTTPClient} from '../http/http-client';

import {JobGroup} from './job/job-group';
import {observeJobGroupCreator} from './job/job-observable';
import {PackageType} from './job/packaging-specification';
import {TranscodeSpecification} from './job/transcode-specification';
import {ExtractPosterRequest} from './requests/extract-poster-request';
import {ExtractStoryboardRequest} from './requests/extract-storyboard-request';
import {TranscodeRequest} from './requests/transcode-request';
import {ExtractPosterJobResponse, IExtractPosterJobResponse} from './responses/extract-poster-job-response';
import {ExtractStoryboardJobResponse, IExtractStoryboardJobResponse} from './responses/extract-storyboard-job-response';
import {IPackagingJobResponse, PackagingJobResponse} from './responses/packaging-job-response';
import {ITranscodeJobResponse, TranscodeJobResponse} from './responses/transcode-job-response';


export interface PackagingSource {
  path?: string;
  fileId?: string;
  name: string;
}

export interface PackagingParams {
  sources: PackagingSource[];
  directory: string;
  acl: ACL;
  chunkDuration: number;
  packageType: PackageType;
}

/**
 * @param {Configuration} configuration
 * @param {HTTPClient} httpClient
 * @doc AVManager
 */

export class AVManager {
  public baseUrl: string;
  public apiUrl: string;

  constructor(public configuration: IConfigurationBase, public httpClient: IHTTPClient) {
    /**
     * @type {string}
     */
    this.baseUrl = `https://${configuration.domain}`;

    /**
     * @type {string}
     */
    this.apiUrl = `${this.baseUrl}/_api/av`;
  }

  /**
   * Transcode video
   * @param {TranscodeRequest} transcodeRequest
   * @returns {Observable<JobGroup<TranscodeSpecification>>}
   */
  public transcodeVideoObservable(transcodeRequest: TranscodeRequest): Observable<JobGroup<TranscodeSpecification>> {
    return observeJobGroupCreator(this.configuration, this.httpClient)(
      () => this.transcodeVideo(transcodeRequest)
    );
  }

  /**
   * Transcode Video
   * @param {TranscodeRequest} transcodeRequest
   * @returns {Promise<TranscodeJobResponse>}
   */
  public transcodeVideo(transcodeRequest: TranscodeRequest): Promise<TranscodeJobResponse> {
    const params = {...transcodeRequest};

    return this.httpClient.post<RawResponse<ITranscodeJobResponse>>(`${this.apiUrl}/transcode`, params)
      .then((response) => {
        return new TranscodeJobResponse(response.payload);
      }, error => {
        return Promise.reject(error);
      });
  }

  /**
   * Extract Poster
   * @param {ExtractPosterRequest} extractPosterRequest
   * @returns {Promise<ExtractPosterJobResponse>}
   */
  public extractPoster(extractPosterRequest: ExtractPosterRequest): Promise<ExtractPosterJobResponse> {
    const params = {...extractPosterRequest};

    return this.httpClient
      .post<RawResponse<IExtractPosterJobResponse>>(
        `${this.apiUrl}/poster`,
        params
      )
      .then(response => {
        return new ExtractPosterJobResponse(response.payload);
      }, error => {
        return Promise.reject(error);
      });
  }

  /**
   * Extract storyboard
   * @param {ExtractStoryboardRequest} extractStoryboardRequest
   * @returns {Promise<ExtractStoryboardJobResponse>}
   */
  public extractStoryboard(extractStoryboardRequest: ExtractStoryboardRequest): Promise<ExtractStoryboardJobResponse> {
    const params = {...extractStoryboardRequest};

    return this.httpClient
      .post<RawResponse<IExtractStoryboardJobResponse>>(
        `${this.apiUrl}/storyboard`,
        params
      )
      .then((response) => {
        return new ExtractStoryboardJobResponse(response.payload);
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }

  /**
   * Packaging Service
   * @param {params} PackagingParams
   * @returns {Promise<PackagingJobResponse>}
   */
  public packageVideo({sources, directory, acl, chunkDuration, packageType}: PackagingParams): Promise<PackagingJobResponse> {
    const params = {
      sources,
      specification: {
        destination: {
          directory,
          acl
        },
        chunkDuration,
        packageType
      }
    };

    return this.httpClient
      .post<RawResponse<IPackagingJobResponse>>(`${this.apiUrl}/package`, params)
      .then(response => new PackagingJobResponse(response.payload));
  }
}
