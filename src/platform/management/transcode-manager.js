import _ from 'underscore';
import {TranscodeJobResponse} from './responses/transcode-job-response';

/**
 * @param {Configuration} configuration
 * @param {HTTPClient} httpClient
 * @constructor
 */

class TranscodeManager {
  constructor(configuration, httpClient) {
    /**
     * @type {Configuration}
     */
    this.configuration = configuration;

    /**
     * @type {HTTPClient}
     */
    this.httpClient = httpClient;

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
    var params = {};
    _.extendOwn(params, transcodeRequest);

    this.httpClient.request('POST', this.apiUrl, params, null, function (error, response) {
      if (error) {
        callback(error, null);
        return;
      }

      callback(null, new TranscodeJobResponse(response.payload));
    });
  }
}

export default TranscodeManager;
export {TranscodeManager};
