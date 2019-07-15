/**
 * Upload Url Response Interface
 * @doc UploadConfigurationResponse
 */
export interface IUploadConfigurationResponse {
  uploadToken: string;
  uploadUrl: string;
}

/**
 * Upload Url Response
 * @doc UploadConfigurationResponse
 */
export class UploadConfigurationResponse
  implements IUploadConfigurationResponse {
  public uploadToken: string;
  public uploadUrl: string;

  constructor(data: IUploadConfigurationResponse) {
    this.uploadToken = data.uploadToken;
    this.uploadUrl = data.uploadUrl;
  }
}
