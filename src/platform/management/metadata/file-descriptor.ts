/**
 * IFileDescriptor
 * @doc FileDescriptor
 */
import { Lifecycle } from '../../../types/media-platform/media-platform';

export interface IFileDescriptor {
  acl: string | null;
  bucket?: string | null;
  dateCreated?: string | null;
  dateExpired?: string | null;
  dateUpdated?: string | null;
  id: string;
  hash?: string | null;
  lifecycle: {
    action: Lifecycle;
    age: number;
  } | null;
  mimeType: string | null;
  path: string;
  size: number | undefined;
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
  public id: string = '';

  /**
   * @description the file content hash (null for folders)
   */
  public hash?: string | null = null;

  /**
   * @description the file location
   */
  public path: string = '';

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
  public size: number | undefined = undefined;

  /**
   * @description whether the file has public access or not
   */
  public acl: string | null = null;

  /**
   * @description bucket - bucket name
   */

  public bucket: string | null = null;

  /**
   * @description lifecycle - delete action: how long the file should leave in seconds
   */
  public lifecycle: {
    action: Lifecycle;
    age: number;
  } | null = null;

  public dateCreated: string | null = null;

  /**
   * @description dateExpired - date and time when file will be removed
   */
  public dateExpired: string | null = null;

  public dateUpdated: string | null = null;

  constructor(data: Partial<IFileDescriptor>) {
    this.acl = data.acl || null;

    this.bucket = data.bucket || null;

    this.dateCreated = data.dateCreated || null;

    if (data.dateCreated && data.lifecycle) {
      this.dateExpired = new Date(
        new Date(data.dateCreated).getTime() + data.lifecycle.age * 1000,
      ).toISOString();
    }

    this.dateUpdated = data.dateUpdated || null;

    if (data.id) {
      this.id = data.id;
    }

    this.hash = data.hash || null;

    this.lifecycle = data.lifecycle || null;

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
