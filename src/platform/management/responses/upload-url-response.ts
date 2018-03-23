export interface IUploadUrlResponse {
  uploadToken: string;
  uploadUrl: string;
}

export class UploadUrlResponse implements IUploadUrlResponse {
  public uploadToken: string;
  public uploadUrl: string;

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
