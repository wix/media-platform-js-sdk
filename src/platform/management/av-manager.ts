import {ACL} from '../../types/media-platform/media-platform';
import {PackageType} from './job/packaging-specification';
import {IPackagingJobResponse, PackagingJobResponse} from './responses/packaging-job-response';
import {ITranscodeJobResponse, TranscodeJobResponse} from './responses/transcode-job-response';
import {IConfigurationBase} from '../configuration/configuration';
import {IHTTPClient} from '../http/http-client';
import {ExtractPosterJobResponse, IExtractPosterJobResponse} from './responses/extract-poster-job-response';
import {ExtractStoryboardJobResponse, IExtractStoryboardJobResponse} from './responses/extract-storyboard-job-response';
import {deprecatedFn} from '../../utils/deprecated/deprecated';
import {RawResponse} from '../../types/response/response';


export type ExtractPosterCallback = (error: Error | null, response: ExtractPosterJobResponse | null) => void;
export type ExtractStoryboardCallback = (error: Error | null, response: ExtractStoryboardJobResponse | null) => void;
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
    this.baseUrl = 'https://' + configuration.domain;

    /**
     * @type {string}
     */
    this.apiUrl = this.baseUrl + '/_api/av';
  }

  /**
   * Transcode Video
   * @param transcodeRequest
   * @param callback DEPRECATED! use promise response instead
   */
  public transcodeVideo(transcodeRequest, callback?) {
    const params = {...transcodeRequest};
    if (callback) {
      callback = deprecatedFn('TranscodeManager.transcodeVideo use promise response instead')(callback);
    }

    this.httpClient.post<RawResponse<ITranscodeJobResponse>>(this.apiUrl + '/transcode', params)
      .then((response) => {
        const transcodeJobResponse = new TranscodeJobResponse(response.payload);
        if (callback) {
          callback(null, transcodeJobResponse);
        }
        return transcodeJobResponse;
      }, error => {
        if (callback) {
          callback(error, null);
        }
        return Promise.reject(error);
      });
  }

  /**
   * Extract Poster
   * @param extractPosterRequest
   * @param callback DEPRECATED! use promise response instead
   */
  public extractPoster(extractPosterRequest, callback?: ExtractPosterCallback): Promise<ExtractPosterJobResponse> {
    const params = {...extractPosterRequest};
    if (callback) {
      callback = deprecatedFn('TranscodeManager.transcodeVideo use promise response instead')(callback);
    }
    return this.httpClient
      .post<RawResponse<IExtractPosterJobResponse>>(
        `${this.apiUrl}/poster`,
        params
      )
      .then(response => {
        const extractPosterJobResponse = new ExtractPosterJobResponse(response.payload);
        // the callback is for consistency compatibility with the old style
        // will be removed soon.
        if (callback) {
          callback(null, extractPosterJobResponse);
        }
        return extractPosterJobResponse;
      }, error => {
        if (callback) {
          callback(error, null);
        }
        return Promise.reject(error);
      });
  }

  /**
   * Extract storyboard
   * @param extractStoryboardRequest
   * @param callback DEPRECATED! use promise response instead
   */
  public extractStoryboard(extractStoryboardRequest, callback?: ExtractStoryboardCallback): Promise<ExtractStoryboardJobResponse> {
    const params = {...extractStoryboardRequest};
    if (callback) {
      callback = deprecatedFn('TranscodeManager.transcodeVideo use promise response instead')(callback);
    }
    return this.httpClient
      .post<RawResponse<IExtractStoryboardJobResponse>>(
        `${this.apiUrl}/storyboard`,
        params
      )
      .then((response) => {
        const extractStoryboardJobResponse = new ExtractStoryboardJobResponse(response.payload);
        if (callback) {
          callback(null, extractStoryboardJobResponse);
        }
        return extractStoryboardJobResponse;
      })
      .catch(error => {
        if (callback) {
          callback(error, null);
        }
        return Promise.reject(error);
      });
  }

  /**
   * Packaging Service
   * @param {params} PackagingParams
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

export class TranscodeManager extends AVManager {
  constructor(configuration, httpClient) {
    deprecatedFn('TranscodeManager: use AVManager class instead of TranscodeManager')(() => {});
    super(configuration, httpClient);
  }
}
