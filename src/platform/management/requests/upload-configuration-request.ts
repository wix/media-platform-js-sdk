/**
 * Upload Configuration request interface
 * @doc UploadConfigurationRequest
 */
import { ACL } from '../../../types/media-platform/media-platform';

export interface IUploadConfigurationRequest {
  acl?: ACL | null;
  mimeType?: string | null;
  path?: string | null;
  size?: number | null;
}

/**
 * Upload Configuration request class
 * @doc UploadConfigurationRequest
 */
export class UploadConfigurationRequest implements IUploadConfigurationRequest {
  public acl?: ACL | null = ACL.PUBLIC;
  public mimeType?: string | null = null;
  public path?: string | null = null;
  public size?: number | null = null;

  constructor(data: IUploadConfigurationRequest) {
    this.acl = data.acl;
    this.mimeType = data.mimeType;
    this.path = data.path;
    this.size = data.size;
  }
}
