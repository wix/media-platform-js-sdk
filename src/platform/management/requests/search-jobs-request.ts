import {OrderDirection} from '../../../types/media-platform/media-platform';


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
}
