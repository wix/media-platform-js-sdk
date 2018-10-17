/**
 * IFileDescriptor
 * @doc FileDescriptor
 */
export interface IFileDescriptor {
  acl: string | null;
  dateCreated?: string | null;
  dateUpdated?: string | null;
  id: string | undefined;
  hash?: string | null;
  lifecycle?: null;
  mimeType: string | null;
  path: string | undefined;
  size?: number | null;
  type?: string | null;
  urn?: string;
}

/**
 * FileDescriptor
 * @doc FileDescriptor
 */
export class FileDescriptor implements IFileDescriptor {
  /**
   * @description a system assigned unique id
   */
  public id: string | undefined = undefined;
  /**
   * @description the file content hash (null for folders)
   */
  public hash?: string | null = null;
  /**
   * @description the file location
   */
  public path: string | undefined = undefined;
  /**
   * @description the file mime type
   */
  public mimeType: string | null = null;
  /**
   * @description file or directory
   */
  public type?: string | null = null;
  /**
   * @description the file size (content-length) in bytes, null for folders
   */
  public size?: number | null = null;
  /**
   * @description whether the file has public access or not
   */
  public acl: string | null = null;
  public dateCreated: string | null = null;
  public dateUpdated: string | null = null;

  constructor(data: Partial<IFileDescriptor>) {
    this.acl = data.acl || null;

    this.dateCreated = data.dateCreated || null;

    this.dateUpdated = data.dateUpdated || null;

    if (data.id) {
      this.id = data.id;
    }

    this.hash = data.hash || null;

    this.mimeType = data.mimeType || null;

    if (data.path) {
      this.path = data.path;
    }

    if (data.size !== undefined) {
      this.size = data.size;
    }

    this.type = data.type || null;
  }
}
