import { ILiveStream, LiveStream } from '../metadata/live-stream';

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
  public nextPageToken: string | undefined = undefined;
  public streams: LiveStream[] | undefined = [];

  constructor(data: ILiveStreamListResponse) {
    this.nextPageToken = data.nextPageToken;

    this.streams = data.streams.map((liveStream) => {
      return new LiveStream(liveStream);
    });
  }
}
