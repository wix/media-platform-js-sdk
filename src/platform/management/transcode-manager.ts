import {TranscodeJobResponse} from './responses/transcode-job-response';
import {IConfigurationBase} from '../configuration/configuration';
import {IHTTPClient} from '../http/http-client';
import {ExtractPosterJobResponse, IExtractPosterJobResponse} from './responses/extract-poster-job-response';
import {ExtractStoryboardJobResponse, IExtractStoryboardJobResponse} from './responses/extract-storyboard-job-response';


export type ExtractPosterCallback = (error: Error | null, response: ExtractPosterJobResponse) => void;
export type ExtractStoryboardCallback = (error: Error | null, response: ExtractStoryboardJobResponse) => void;

/**
 * @param {Configuration} configuration
 * @param {HTTPClient} httpClient
 * @constructor
 */

export class TranscodeManager {
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

  public transcodeVideo(transcodeRequest, callback) {
    const params = {...transcodeRequest};

    this.httpClient.request('POST', this.apiUrl + '/transcode', params, null, function (error, response) {
      if (error) {
        callback(error, null);
        return;
      }

      callback(null, new TranscodeJobResponse(response.payload));
    });
  }

  public extractPoster(extractPosterRequest, callback?: ExtractPosterCallback): Promise<ExtractPosterJobResponse> {
    const params = {...extractPosterRequest};

    return this.httpClient
      .post<{ payload: IExtractPosterJobResponse }>(
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
  };

  public extractStoryboard(extractStoryboardRequest, callback?: ExtractStoryboardCallback): Promise<ExtractStoryboardJobResponse> {
    const params = {...extractStoryboardRequest};

    return this.httpClient
      .post<{ payload: IExtractStoryboardJobResponse }>(
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
  };


}
