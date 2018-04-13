import {deprecated} from 'core-decorators';

export enum OrderDirection {
  ASC = 'asc',
  DES = 'des'
}

export interface ISearchJobsRequest {
  nextPageToken?: string | null;
  pageSize?: number | null;
  orderBy?: string | null;
  orderDirection?: OrderDirection | null;
  issuer?: string | null;
  type?: string | null;
  status?: string | null;
  groupId?: string | null;
  fileId?: string | null;
  path?: string | null;
}

/**
 * Search Jobs Request
 * @doc SearchJobsRequest
 */
export class SearchJobsRequest {
  public nextPageToken: string | null = null;
  public pageSize: number | null = null;
  public orderBy: string | null = null;
  public orderDirection: OrderDirection | null = null;
  public issuer: string | null = null;
  public type: string | null = null;
  public status: string | null = null;
  public groupId: string | null = null;
  public fileId: string | null = null;
  public path: string | null = null;

  constructor({
                nextPageToken,
                pageSize,
                orderBy,
                orderDirection,
                issuer,
                type,
                status,
                groupId,
                fileId,
                path
              }: ISearchJobsRequest = {}) {
    this.nextPageToken = nextPageToken || null;
    this.pageSize = pageSize || null;
    this.orderBy = orderBy || null;
    this.orderDirection = orderDirection || null;
    this.issuer = issuer || null;
    this.type = type || null;
    this.status = status || null;
    this.groupId = groupId || null;
    this.fileId = fileId || null;
    this.path = path || null;
  }

  /**
   * @deprecated pass data to constructor instead
   * @param nextPageToken
   * @returns {SearchJobsRequest}
   */
  @deprecated('pass data to constructor instead')
  setNextPageToken(nextPageToken: string): this {
    this.nextPageToken = nextPageToken;
    return this;
  }

  /**
   * @deprecated pass data to constructor instead
   * @param pageSize
   * @returns {SearchJobsRequest}
   */
  @deprecated('pass data to constructor instead')
  setPageSize(pageSize: number): this {
    this.pageSize = pageSize;
    return this;
  }

  /**
   * @deprecated pass data to constructor instead
   * @param orderBy name or date
   * @returns {SearchJobsRequest}
   */
  @deprecated('pass data to constructor instead')
  setOrderBy(orderBy: string): this {
    this.orderBy = orderBy;
    return this;
  }

  /**
   * @returns {SearchJobsRequest}
   */
  ascending(): this {
    this.orderDirection = OrderDirection.ASC;
    return this;
  }

  /**
   * @returns {SearchJobsRequest}
   */
  descending(): this {
    this.orderDirection = OrderDirection.DES;
    return this;
  }

  /**
   * @deprecated pass data to constructor instead
   * @param type job type
   * @returns {SearchJobsRequest}
   */
  @deprecated('pass data to constructor instead')
  setType(type: string): this {
    this.type = type;
    return this;
  }

  /**
   * @deprecated pass data to constructor instead
   * @param status job status (pending, success etc.)
   * @returns {SearchJobsRequest}
   */
  @deprecated('pass data to constructor instead')
  setStatus(status: string): this {
    this.status = status;
    return this;
  }

  /**
   * @deprecated pass data to constructor instead
   * @param groupId job group ID
   * @returns {SearchJobsRequest}
   */
  @deprecated('pass data to constructor instead')
  setGroupId(groupId: string): this {
    this.groupId = groupId;
    return this;
  }

  /**
   * @deprecated pass data to constructor instead
   * @param fileId of the job's source file
   * @returns {SearchJobsRequest}
   */
  @deprecated('pass data to constructor instead')
  setFileId(fileId: string): this {
    this.fileId = fileId;
    return this;
  }

  /**
   * @deprecated pass data to constructor instead
   * @param path of the job's source file
   * @returns {SearchJobsRequest}
   */
  @deprecated('pass data to constructor instead')
  setPath(path: string): this {
    this.path = path;
    return this;
  }
}

