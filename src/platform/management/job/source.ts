export interface ISource {
  path: string;
  fileId: string;
}

export class Source {
  public path: string | null = null;
  public fileId: string | null = null;

  constructor(data?: ISource) {
    if (data) {
      this.deserialize(data);
    }
  }

  /**
   * @param fileId
   * @returns {Source}
   */
  setFileId(fileId: string): this {
    this.fileId = fileId;
    return this;
  }

  /**
   * @param path
   * @returns {Source}
   */
  setPath(path: string): this {
    this.path = path;
    return this;
  }

  /**
   * @param data
   * @private
   */
  deserialize(data: ISource) {
    this.fileId = data.fileId;
    this.path = data.path;
  }
}
