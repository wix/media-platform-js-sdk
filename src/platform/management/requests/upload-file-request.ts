export class UploadFileRequest {
  public mimeType: string = 'application/octet-stream';
  public acl: string = 'public';

  /**
   * @param mimeType
   * @returns {UploadFileRequest}
   */
  setMimeType(mimeType: string): this {
    this.mimeType = mimeType;
    return this;
  }

  /**
   * @param acl
   * @returns {UploadFileRequest}
   */
  setAcl(acl: string): this {
    this.acl = acl;
    return this;
  }
}
