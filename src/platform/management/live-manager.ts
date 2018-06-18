import {ILiveStream, LiveStream} from './metadata/live-stream';
import {IConfigurationBase} from '../configuration/configuration';
import {IHTTPClient} from '../http/http-client';
import {RawResponse} from '../../types/response/response';
import {deprecatedFn} from '../../utils/deprecated/deprecated';
import {ILiveStreamListResponse, LiveStreamListResponse} from './responses/live-stream-list-response';

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

  /**
   * Open stream
   * @param liveStreamRequest
   * @param callback DEPRECATED! use promise response instead
   */
  openStream(liveStreamRequest, callback?): Promise<LiveStream> {
    if (callback) {
      callback = deprecatedFn('LiveManager.openStream use promise response instead')(callback);
    }
    return this.httpClient
      .post<RawResponse<ILiveStream>>(this.apiUrl + '/stream', liveStreamRequest)
      .then((response) => {
        const liveStream = new LiveStream(response.payload);
        if (callback) {
          callback(null, liveStream);
        }
        return liveStream;
      }, error => {
        if (callback) {
          callback(error, null);
        }
        return Promise.reject(error);
      });
  }

  /**
   * Get stream
   * @param streamId
   * @param callback DEPRECATED! use promise response instead
   */
  getStream(streamId, callback?): Promise<LiveStream> {
    if (callback) {
      callback = deprecatedFn('LiveManager.getStream use promise response instead')(callback);
    }
    return this.httpClient.get<RawResponse<ILiveStream>>(this.apiUrl + '/stream/' + streamId)
      .then((response) => {
        const liveStream = new LiveStream(response.payload);
        if (callback) {
          callback(null, liveStream);
        }
        return liveStream;
      }, error => {
        if (callback) {
          callback(error, null);
        }
        return Promise.reject(error);
      });
  }

  /**
   * Close stream
   * @param streamId
   * @param callback DEPRECATED! use promise response instead
   */
  closeStream(streamId, callback?): Promise<void> {
    if (callback) {
      callback = deprecatedFn('LiveManager.closeStream use promise response instead')(callback);
    }
    return this.httpClient.delete(this.apiUrl + '/stream/' + streamId)
      .then((response) => {
        if (callback) {
          callback(null, response);
        }
      }, error => {
        if (callback) {
          callback(error, null);
        }
        return Promise.reject(error);
      });
  }

  /**
   * List streams
   * @param {LiveStreamListRequest} liveStreamListRequest
   * @param callback DEPRECATED! use promise response instead
   */
  listStreams(liveStreamListRequest?, callback?): Promise<LiveStreamListResponse> {
    if (callback) {
      callback = deprecatedFn('LiveManager.listStreams use promise response instead')(callback);
    }

    return this.httpClient.get<RawResponse<ILiveStreamListResponse>>(this.apiUrl + '/list_streams', liveStreamListRequest.toParams())
      .then((response) => {
        const liveStreamListResponse = new LiveStreamListResponse(response.payload);

        if (callback) {
          callback(null, liveStreamListResponse);
        }
        return liveStreamListResponse;
      }, error => {
        if (callback) {
          callback(error, null);
        }
        return Promise.reject(error);
      });
  }

  /**
   * Get URL of stream cover
   * @param {string} streamId
   * @returns {string}
   */
  async getStreamCoverUrl(streamId: string): Promise<string> {
    return await this.httpClient.addAuthToUrl(this.apiUrl + `/stream/${streamId}/frame`);
  }
}
