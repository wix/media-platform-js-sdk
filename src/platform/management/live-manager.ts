import { RawResponse } from '../../types/response/response';
import { IConfigurationBase } from '../configuration/configuration';
import { IHTTPClient } from '../http/http-client';

import { ILiveStream, LiveStream } from './metadata/live-stream';
import {
  ILiveStreamAnalytics,
  LiveStreamAnalytics,
} from './metadata/live-stream-analytics';
import { LiveStreamListRequest } from './requests/live-stream-list-request';
import { LiveStreamRequest } from './requests/live-stream-request';
import {
  ILiveStreamListResponse,
  LiveStreamListResponse,
} from './responses/live-stream-list-response';

/**
 * @param {Configuration} configuration
 * @param {HTTPClient} httpClient
 * @constructor
 */

export class LiveManager {
  public baseUrl: string;
  public apiUrl: string;

  constructor(
    public configuration: IConfigurationBase,
    public httpClient: IHTTPClient,
  ) {
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
   * @param {LiveStreamRequest} liveStreamRequest
   * @returns {Promise<LiveStream>}
   */
  openStream(liveStreamRequest: LiveStreamRequest): Promise<LiveStream> {
    return this.httpClient
      .post<RawResponse<ILiveStream>>(
        this.apiUrl + '/stream',
        liveStreamRequest,
      )
      .then(
        response => {
          return new LiveStream(response.payload);
        },
        error => {
          return Promise.reject(error);
        },
      );
  }

  /**
   * Get stream
   * @param {string} streamId
   * @returns {Promise<LiveStream>}
   */
  getStream(streamId: string): Promise<LiveStream> {
    return this.httpClient
      .get<RawResponse<ILiveStream>>(this.apiUrl + '/stream/' + streamId)
      .then(
        response => {
          return new LiveStream(response.payload);
        },
        error => {
          return Promise.reject(error);
        },
      );
  }

  /**
   * Get stream
   * @param {string} streamId
   * @returns {Promise<LiveStreamAnalytics>}
   */
  getStreamAnalytics(streamId: string): Promise<LiveStreamAnalytics> {
    return this.httpClient
      .get<RawResponse<ILiveStreamAnalytics>>(
        this.apiUrl + '/stream/' + streamId + '/analytics',
      )
      .then(
        response => {
          return new LiveStreamAnalytics(response.payload);
        },
        error => {
          return Promise.reject(error);
        },
      );
  }

  /**
   * Close stream
   * @param {string} streamId
   * @returns {Promise<void>}
   */
  closeStream(streamId: string): Promise<void> {
    return this.httpClient
      .delete(this.apiUrl + '/stream/' + streamId)
      .catch(error => {
        return Promise.reject(error);
      });
  }

  /**
   * List streams
   * @param {LiveStreamListRequest} liveStreamListRequest
   * @returns {Promise<LiveStreamListResponse>}
   */
  listStreams(
    liveStreamListRequest?: LiveStreamListRequest,
  ): Promise<LiveStreamListResponse> {
    const params = liveStreamListRequest && liveStreamListRequest.toParams();

    return this.httpClient
      .get<RawResponse<ILiveStreamListResponse>>(
        this.apiUrl + '/streams',
        params,
      )
      .then(
        response => {
          return new LiveStreamListResponse(response.payload);
        },
        error => {
          return Promise.reject(error);
        },
      );
  }

  /**
   * Get URL of stream cover
   * @param {string} streamId
   * @returns {Promise<string>}
   */
  async getStreamCoverUrl(streamId: string): Promise<string> {
    return this.httpClient.addAuthToUrl(
      this.apiUrl + `/stream/${streamId}/frame`,
    );
  }
}
