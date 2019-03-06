import {
  LiveStreamState,
  OrderDirection,
} from '../../../types/media-platform/media-platform';

export interface ILiveStreamListRequest {
  nextPageToken?: string;
  pageSize?: number;
  orderBy?: string | undefined;
  orderDirection?: OrderDirection | undefined;
  state?: LiveStreamState[] | undefined;
}

export interface ILiveStreamListParams {
  nextPageToken?: string;
  pageSize?: string;
  orderBy?: string | undefined;
  orderDirection?: string | undefined;
  state?: string | undefined;
}

/**
 * List Files Request
 * @doc ListFilesRequest
 */
export class LiveStreamListRequest implements ILiveStreamListRequest {
  public nextPageToken?: string;
  public pageSize?: number;
  public orderBy?: string;
  public orderDirection?: OrderDirection | undefined;
  public state?: LiveStreamState[] | undefined;

  constructor(data?: ILiveStreamListRequest) {
    if (!data) {
      data = {};
    }
    this.nextPageToken = data.nextPageToken || undefined;
    this.pageSize = data.pageSize || undefined;
    this.orderBy = data.orderBy || undefined;
    this.orderDirection = data.orderDirection || undefined;
    this.state = data.state || undefined;
  }

  public toParams(): ILiveStreamListParams {
    const params: ILiveStreamListParams = {};

    if (typeof this.nextPageToken !== 'undefined') {
      params.nextPageToken = this.nextPageToken;
    }

    if (typeof this.pageSize !== 'undefined') {
      params.pageSize = this.pageSize.toString();
    }

    if (typeof this.orderBy !== 'undefined') {
      params.orderBy = this.orderBy;
    }

    if (typeof this.orderDirection !== 'undefined') {
      params.orderDirection = this.orderDirection.toString();
    }

    if (typeof this.state !== 'undefined') {
      params.state = this.state.join(',');
    }

    return params;
  }
}
