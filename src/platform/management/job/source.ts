/**
 * Source interface
 * @doc Source
 */
import {deprecated} from 'core-decorators';

export interface ISource {
  path?: string | null;
  fileId?: string | null;
}

/**
 * Source
 * @doc Source
 */
export class Source implements ISource {
  public path: string | null = null;
  public fileId: string | null = null;

  constructor(data: ISource) {
    this.deserialize(data);
  }

  /**
   * @deprecated pass data to constructor instead
   * @param fileId
   * @returns {Source}
   */
  @deprecated('pass data to constructor instead')
  public setFileId(fileId: string): this {
    this.fileId = fileId;
    return this;
  }

  /**
   * @deprecated pass data to constructor instead
   * @param path
   * @returns {Source}
   */
  @deprecated('pass data to constructor instead')
  public setPath(path: string): this {
    this.path = path;
    return this;
  }

  /**
   * @param data
   * @private
   */
  private deserialize(data: ISource) {
    if (data.fileId !== undefined) {
      this.fileId = data.fileId;
    }
    if (data.path !== undefined) {
      this.path = data.path;
    }
  }
}
