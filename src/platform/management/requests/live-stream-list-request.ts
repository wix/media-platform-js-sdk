import {LiveStreamState, OrderDirection} from '../../../types/media-platform/media-platform';

export interface ILiveStreamListRequest {
  nextPageToken?: string;
  pageSize?: number;
  orderBy?: string | undefined;
  orderDirection?: OrderDirection | undefined;
  state?: LiveStreamState[] | undefined;
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
    if(!data) {
      data = {}
    }
    this.nextPageToken = data.nextPageToken || undefined;
    this.pageSize = data.pageSize || undefined;
    this.orderBy = data.orderBy || undefined;
    this.orderDirection = data.orderDirection || undefined;
    this.state = data.state || undefined;
  }

  public toParams() : string {
      const str: string[] = [];
      for (const p in this)
        if (this.hasOwnProperty(p) && typeof this[p] !== 'undefined' && this[p] != null) {
          if(p === 'state') {
            str.push(encodeURIComponent(p) + '=' + this[p].join(','))
          } else {
            str.push(encodeURIComponent(p) + '=' + this[p]);
          }
        }
      return str.join("&");
  }
}
