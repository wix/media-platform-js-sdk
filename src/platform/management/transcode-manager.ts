import {TranscodeJobResponse} from './responses/transcode-job-response';
import {IConfigurationBase} from '../configuration/configuration';
import {IHTTPClient} from '../http/http-client';

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
    this.apiUrl = this.baseUrl + '/_api/av/transcode';
  }

  /**
   * @param {TranscodeRequest} transcodeRequest
   * todo: job group type
   * @param {function(Error, Object)} callback
   */
  transcodeVideo(transcodeRequest, callback) {
    const params = {...transcodeRequest};

    this.httpClient.request('POST', this.apiUrl, params, null, function (error, response) {
      if (error) {
        callback(error, null);
        return;
      }

      callback(null, new TranscodeJobResponse(response.payload));
    });
  }
}
