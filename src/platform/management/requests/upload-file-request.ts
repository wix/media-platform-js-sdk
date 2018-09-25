import {ACL} from '../../../types/media-platform/media-platform';


export interface IUploadFileRequest {
  acl?: ACL | null;
  mimeType?: string | null;
}

/**
 * Upload File Request
 * @doc UploadFileRequest
 */
export class UploadFileRequest {
  public acl?: ACL | null = ACL.PUBLIC;
  public mimeType?: string | null = 'application/octet-stream';

  constructor(data: IUploadFileRequest) {
    this.acl = data.acl;
    this.mimeType = data.mimeType;
  }
}
