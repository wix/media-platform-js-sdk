export class SearchJobsRequest {
  public nextPageToken: string | null = null;
  public pageSize: number | null = null;
  public orderBy: string | null = null;
  public orderDirection: string | null = null;
  public issuer: string | null = null;
  public type: string | null = null;
  public status: string | null = null;
  public groupId: string | null = null;
  public fileId: string | null = null;
  public path: string | null = null;

  /**
   * @param nextPageToken
   * @returns {SearchJobsRequest}
   */
  setNextPageToken(nextPageToken: string): this {
    this.nextPageToken = nextPageToken;
    return this;
  }

  /**
   * @param pageSize
   * @returns {SearchJobsRequest}
   */
  setPageSize(pageSize: number): this {
    this.pageSize = pageSize;
    return this;
  }

  /**
   * @param orderBy name or date
   * @returns {SearchJobsRequest}
   */
  setOrderBy(orderBy: string): this {
    this.orderBy = orderBy;
    return this;
  }

  /**
   * @returns {SearchJobsRequest}
   */
  ascending(): this {
    this.orderDirection = 'acs';
    return this;
  }

  /**
   * @returns {SearchJobsRequest}
   */
  descending(): this {
    this.orderDirection = 'des';
    return this;
  }

  /**
   * @param type job type
   * @returns {SearchJobsRequest}
   */
  setType(type: string): this {
    this.type = type;
    return this;
  }

  /**
   * @param status job status (pending, success etc.)
   * @returns {SearchJobsRequest}
   */
  setStatus(status: string): this {
    this.status = status;
    return this;
  }

  /**
   * @param groupId job group ID
   * @returns {SearchJobsRequest}
   */
  setGroupId(groupId: string): this {
    this.groupId = groupId;
    return this;
  }

  /**
   * @param fileId of the job's source file
   * @returns {SearchJobsRequest}
   */
  setFileId(fileId: string): this {
    this.fileId = fileId;
    return this;
  }

  /**
   * @param path of the job's source file
   * @returns {SearchJobsRequest}
   */
  setPath(path: string): this {
    this.path = path;
    return this;
  }
}

