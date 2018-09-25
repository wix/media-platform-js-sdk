/**
 * IFileDescriptor
 * @doc FileDescriptor
 */
export interface IFileDescriptor {
  id: string;
  hash: string | null;
  path: string;
  mimeType: string | null;
  type: string | null;
  size: number;
  acl: string | null;
  dateCreated?: string | null;
  dateUpdated?: string | null;
}

/**
 * FileDescriptor
 * @doc FileDescriptor
 */
export class FileDescriptor implements IFileDescriptor {
  /**
   * @description a system assigned unique id
   */
  public id: string;
  /**
   * @description the file content hash (null for folders)
   */
  public hash: string | null = null;
  /**
   * @description the file location
   */
  public path: string;
  /**
   * @description the file mime type
   */
  public mimeType: string | null = null;
  /**
   * @description file or directory
   */
  public type: string | null = null;
  /**
   * @description the file size (content-length) in bytes, null for folders
   */
  public size: number;
  /**
   * @description whether the file has public access or not
   */
  public acl: string | null = null;
  public dateCreated: string | null = null;
  public dateUpdated: string | null = null;

  constructor(data: Partial<IFileDescriptor>) {
    if (data.id) {
      this.id = data.id;
    }
    this.hash = data.hash || null;
    if (data.path) {
      this.path = data.path;
    }
    this.mimeType = data.mimeType || null;
    this.type = data.type || null;
    if (data.size !== undefined) {
      this.size = data.size;
    }
    this.acl = data.acl || null;
    this.dateCreated = data.dateCreated || null;
    this.dateUpdated = data.dateUpdated || null;
  }
}
