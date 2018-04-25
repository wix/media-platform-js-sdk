import {deprecated} from 'core-decorators';
import {OrderDirection} from '../../../types/media-platform/media-platform';

export interface IListFilesRequest {
  nextPageToken?: string;
  pageSize?: number;
  orderBy?: string | null;
  orderDirection?: OrderDirection | null;
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

  constructor(data: IListFilesRequest) {
    this.nextPageToken = data.nextPageToken;
    if (data.pageSize) {
      this.pageSize = data.pageSize;
    }
    this.orderBy = data.orderBy || null;
    this.orderDirection = data.orderDirection || null;
  }

  /**
   * @param nextPageToken
   * @returns {ListFilesRequest}
   */
  @deprecated('pass data to constructor instead')
  setNextPageToken(nextPageToken: string): this {
    this.nextPageToken = nextPageToken;
    return this;
  }

  /**
   * @param pageSize
   * @returns {ListFilesRequest}
   */
  @deprecated('pass data to constructor instead')
  setPageSize(pageSize: number): this {
    this.pageSize = pageSize;
    return this;
  }

  /**
   * @param orderBy name or date
   * @returns {ListFilesRequest}
   */
  @deprecated('pass data to constructor instead')
  setOrderBy(orderBy: string): this {
    this.orderBy = orderBy;
    return this;
  }

  /**
   * @returns {ListFilesRequest}
   */
  @deprecated('pass data to constructor instead')
  ascending(): this {
    this.orderDirection = OrderDirection.ASC;
    return this;
  }

  /**
   * @returns {ListFilesRequest}
   */
  @deprecated('pass data to constructor instead')
  descending(): this {
    this.orderDirection = OrderDirection.DES;
    return this;
  }
}
