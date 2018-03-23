import {LiveStream} from './metadata/live-stream';
import {IConfigurationBase} from '../configuration/configuration';
import {IHTTPClient} from '../http/http-client';

/**
 * @param {Configuration} configuration
 * @param {HTTPClient} httpClient
 * @constructor
 */

export class LiveManager {
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
    this.apiUrl = this.baseUrl + '/_api/live';
  }

  openStream(liveStreamRequest, callback) {
    this.httpClient.request('POST', this.apiUrl + '/stream', liveStreamRequest, undefined, function (error, response) {
      if (error) {
        callback(error, null);
        return;
      }

      callback(null, new LiveStream(response.payload));
    });
  }

  getStream(streamId, callback) {
    this.httpClient.request('GET', this.apiUrl + '/stream/' + streamId, null, undefined, function (error, response) {
      if (error) {
        callback(error, null);
        return;
      }

      callback(null, new LiveStream(response.payload));
    });
  }

  closeStream(streamId, callback) {
    this.httpClient.request('DELETE', this.apiUrl + '/stream/' + streamId, null, undefined, function (error, response) {
      if (error) {
        callback(error, null);
        return;
      }

      callback(null, response);
    });
  }

  listStreams(callback) {
    this.httpClient.request('GET', this.apiUrl + '/list_streams', null, undefined, function (error, response) {
      if (error) {
        callback(error, null);
        return;
      }

      const streams: LiveStream[] = [];
      for (const i in response.payload) {
        streams.push(new LiveStream(response.payload[i]));
      }

      callback(null, streams);
    });
  }
}
