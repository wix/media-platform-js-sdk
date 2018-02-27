export interface IFileDescriptor {
  id: string;
  hash: string;
  path: string;
  mimeType: string;
  type: string;
  size: number;
  acl: string;
  dateCreated?: string;
  dateUpdated?: string;
}

export class FileDescriptor {
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

  constructor(data?: Partial<IFileDescriptor>) {
    if (data) {
      this.deserialize(data);
    }
  }

  /**
   * @param data
   * @private
   */
  deserialize(data: Partial<IFileDescriptor>) {
    this.id = data.id;
    this.hash = data.hash;
    this.path = data.path;
    this.mimeType = data.mimeType;
    this.type = data.type;
    this.size = data.size;
    this.acl = data.acl;
    this.dateCreated = data.dateCreated;
    this.dateUpdated = data.dateUpdated;
  }
}
