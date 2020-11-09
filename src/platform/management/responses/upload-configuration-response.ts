/**
 * Upload Url Response Interface
 * @doc UploadConfigurationResponse
 */
export interface IUploadConfigurationResponse {
  uploadUrl: string;
}

/**
 * Upload Url Response
 * @doc UploadConfigurationResponse
 */
export class UploadConfigurationResponse
  implements IUploadConfigurationResponse {
  public uploadUrl: string;

  constructor(data: IUploadConfigurationResponse) {
    this.uploadUrl = data.uploadUrl;
  }
}
