import { ACL, Lifecycle } from '../../../types/media-platform/media-platform';

export interface IUploadFileRequest {
  acl?: ACL | null;
  age?: number;
  mimeType?: string | null;
}

/**
 * Upload File Request
 * @doc UploadFileRequest
 */
export class UploadFileRequest {
  public acl?: ACL | null = ACL.PUBLIC;
  public lifecycle?: string;
  public mimeType?: string | null = 'application/octet-stream';

  constructor(data: IUploadFileRequest) {
    if (data.acl) {
      this.acl = data.acl;
    }

    if (data.age) {
      // strong validation of age type
      const age =
        typeof data.age === 'string' ? parseInt(data.age, 10) : data.age;

      this.lifecycle = JSON.stringify({
        action: Lifecycle.Delete,
        age,
      });
    }

    if (data.mimeType) {
      this.mimeType = data.mimeType;
    }
  }
}
