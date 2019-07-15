/**
 * Upload Configuration request interface
 * @doc UploadConfigurationRequest
 */
import { ACL } from '../../../types/media-platform/media-platform';

export interface IUploadConfigurationRequest {
  acl?: ACL;
  mimeType?: string | null;
  path?: string | null;
  size?: number | null;
}

/**
 * Upload Configuration request class
 * @doc UploadConfigurationRequest
 */
export class UploadConfigurationRequest implements IUploadConfigurationRequest {
  public acl: ACL;
  public mimeType?: string | null = null;
  public path?: string | null = null;
  public size?: number | null = null;

  constructor(data: IUploadConfigurationRequest) {
    this.acl = data.acl || ACL.PUBLIC;
    this.mimeType = data.mimeType;
    this.path = data.path;
    this.size = data.size;
  }
}
