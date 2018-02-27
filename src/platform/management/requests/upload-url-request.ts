export class UploadUrlRequest {
  public mimeType: string | null = null;
  public path: string | null = null;
  public size: number | null = null;
  public acl: string | null = 'public';

  /**
   * @param mimeType
   * @returns {UploadUrlRequest}
   */
  setMimeType(mimeType: string): this {
    this.mimeType = mimeType;
    return this;
  }

  /**
   * @param path
   * @returns {UploadUrlRequest}
   */
  setPath(path: string): this {
    this.path = path;
    return this;
  }

  /**
   * @description Optional file size in bytes. Required for file size enforcement
   * @param size
   * @returns {UploadUrlRequest}
   */
  setSize(size: number): this {
    this.size = size;
    return this;
  }

  /**
   * @param acl
   * @returns {UploadUrlRequest}
   */
  setAcl(acl: string): this {
    this.acl = acl;
    return this;
  }
}

