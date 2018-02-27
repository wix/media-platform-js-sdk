export interface IUploadUrlResponse {
  uploadToken: string;
  uploadUrl: string;
}

export class UploadUrlResponse {
  public uploadToken: string | null = null;
  public uploadUrl: string | null = null;

  constructor(data?: IUploadUrlResponse) {
    if (data) {
      this.deserialize(data);
    }
  }

  /**
   * @param data
   * @private
   */
  deserialize(data: IUploadUrlResponse) {
    this.uploadToken = data.uploadToken;
    this.uploadUrl = data.uploadUrl;
  }
}
