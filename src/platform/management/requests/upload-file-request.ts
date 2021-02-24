import { ACL, LifecycleAction } from '../../../types/media-platform/media-platform';

export interface IUploadFileRequest {
  acl?: ACL | null;
  age?: number;
  mimeType?: string | null;
  fileName?: string | null;
}

/**
 * Upload File Request
 * @doc UploadFileRequest
 */
export class UploadFileRequest {
  public acl?: ACL | null = ACL.PUBLIC;
  public lifecycle?: string;
  public mimeType?: string | null = 'application/octet-stream';
  public fileName?: string | null = '';

  constructor(data: IUploadFileRequest) {
    if (data.acl) {
      this.acl = data.acl;
    }

    if (data.age) {
      // strong validation of age type
      const age =
        typeof data.age === 'string' ? parseInt(data.age, 10) : data.age;

      this.lifecycle = JSON.stringify({
        action: LifecycleAction.Delete,
        age,
      });
    }

    if (data.mimeType) {
      this.mimeType = data.mimeType;
    }

    if (data.fileName) {
      this.fileName = data.fileName;
    }
  }
}
