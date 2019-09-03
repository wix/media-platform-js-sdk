/**
 * Upload Configuration request interface
 * @doc UploadConfigurationRequest
 */
import { ACL } from '../../../types/media-platform/media-platform';
import { ICallback } from '../job/callback';

export interface IUploadConfigurationRequest {
  acl: ACL | null;
  mimeType?: string | null;
  path?: string | null;
  size?: number | null;
  callback?: ICallback | null;
}

/**
 * Upload Configuration request class
 * @doc UploadConfigurationRequest
 */
export class UploadConfigurationRequest implements IUploadConfigurationRequest {
  public acl: ACL = ACL.PUBLIC;
  public mimeType?: string | null = null;
  public path?: string | null = null;
  public size?: number | null = null;
  public callback?: ICallback;

  constructor(data: IUploadConfigurationRequest) {
    this.acl = data.acl || ACL.PUBLIC;
    this.mimeType = data.mimeType;
    this.path = data.path;
    this.size = data.size;

    if (data.callback) {
      this.callback = data.callback;
    }
  }
}
