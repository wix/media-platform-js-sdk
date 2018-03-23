export interface IDestination {
  path: string | null;
  directory: string | null;
  acl: string;
}

export class Destination implements IDestination {
  public path: string | null = null;
  public directory: string | null = null;
  public acl: string = 'public';

  constructor(data?: IDestination) {
    if (data) {
      this.deserialize(data);
    }
  }

  /**
   * @param {string} path
   * @returns {Destination}
   */
  setPath(path) {
    this.path = path;
    this.directory = null;
    return this;
  }

  /**
   * @param {string} directory
   * @returns {Destination}
   */
  setDirectory(directory) {
    this.directory = directory;
    this.path = null;
    return this;
  }

  /**
   * @param {string} acl
   * @returns {Destination}
   */
  setAcl(acl) {
    this.acl = acl;
    return this;
  }

  /**
   * @param data
   * @private
   */
  deserialize(data: IDestination) {
    this.path = data.path;
    this.directory = data.directory;
    this.acl = data.acl;
  }
}
