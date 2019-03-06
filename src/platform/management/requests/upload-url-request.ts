/**
 * Upload URL request interface
 * @doc UploadUrlRequest
 */
import { ACL } from '../../../types/media-platform/media-platform';

export interface IUploadUrlRequest {
  acl?: ACL | null;
  mimeType?: string | null;
  path?: string | null;
  size?: number | null;
}

/**
 * Upload URL request class
 * @doc UploadUrlRequest
 */
export class UploadUrlRequest implements IUploadUrlRequest {
  public acl?: ACL | null = ACL.PUBLIC;
  public mimeType?: string | null = null;
  public path?: string | null = null;
  public size?: number | null = null;

  constructor(data: IUploadUrlRequest) {
    this.acl = data.acl;
    this.mimeType = data.mimeType;
    this.path = data.path;
    this.size = data.size;
  }
}
