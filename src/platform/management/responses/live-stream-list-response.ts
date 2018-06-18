import {ILiveStream, LiveStream} from '../metadata/live-stream';

/**
 * Live Stream List Response interface
 * @doc LiveStreamListResponse
 */
export interface ILiveStreamListResponse {
  nextPageToken: string;
  streams: ILiveStream[];
}

/**
 * Search Live Stream List Response
 * @doc LiveStreamListResponse
 */
export class LiveStreamListResponse {
  public nextPageToken: string | null = null;
  public streams: LiveStream[] | null = [];

  constructor(data: ILiveStreamListResponse) {
    this.deserialize(data);
  }

  /**
   * @param data
   * @private
   */
  deserialize(data: ILiveStreamListResponse) {
    this.nextPageToken = data.nextPageToken;
    this.streams = data.streams.map((liveStream) => {
      return new LiveStream(liveStream);
    });
  }
}
