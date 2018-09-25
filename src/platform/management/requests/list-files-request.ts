import {FileType, OrderDirection} from '../../../types/media-platform/media-platform';


export interface IListFilesRequest {
  nextPageToken?: string;
  pageSize?: number;
  orderBy?: string | null;
  orderDirection?: OrderDirection | null;
  type?: FileType | null;
}

/**
 * List Files Request
 * @doc ListFilesRequest
 */
export class ListFilesRequest implements IListFilesRequest {
  public nextPageToken?: string;
  public pageSize: number = 20;
  public orderBy: string | null = null;
  public orderDirection: OrderDirection | null = null;
  public type: FileType | null;

  constructor(data: IListFilesRequest = {}) {
    if (data.nextPageToken) {
      this.nextPageToken = data.nextPageToken;
    }
    if (data.pageSize) {
      this.pageSize = data.pageSize;
    }
    this.orderBy = data.orderBy || null;
    this.orderDirection = data.orderDirection || null;
    this.type = data.type || null;
  }
}
