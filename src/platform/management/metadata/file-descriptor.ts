/**
 * IFileDescriptor
 * @doc FileDescriptor
 */
export interface IFileDescriptor {
  id: string | null;
  hash: string | null;
  path: string | null;
  mimeType: string | null;
  type: string | null;
  size: number | null;
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
  public id: string | null = null;
  /**
   * @description the file content hash (null for folders)
   */
  public hash: string | null = null;
  /**
   * @description the file location
   */
  public path: string | null = null;
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
  public size: number | null = null;
  /**
   * @description whether the file has public access or not
   */
  public acl: string | null = null;
  public dateCreated: string | null = null;
  public dateUpdated: string | null = null;

  constructor(data: Partial<IFileDescriptor>) {
    this.deserialize(data);
  }

  /**
   * @param data
   * @private
   */
  deserialize(data: Partial<IFileDescriptor>) {
    this.id = data.id || null;
    this.hash = data.hash || null;
    this.path = data.path || null;
    this.mimeType = data.mimeType || null;
    this.type = data.type || null;
    this.size = data.size || null;
    this.acl = data.acl || null;
    this.dateCreated = data.dateCreated || null;
    this.dateUpdated = data.dateUpdated || null;
  }
}
