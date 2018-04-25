import {deprecated} from 'core-decorators';

/**
 * Destination interface
 * @doc Destination
 */
export interface IDestination {
  path?: string | null;
  directory?: string | null;
  acl?: string; // 'private' | 'public'
}

/**
 * Destination
 * @doc Destination
 */
export class Destination implements IDestination {
  public path: string | null = null;
  public directory: string | null = null;
  public acl: string = 'public';

  constructor(data: IDestination) {
    this.deserialize(data);
  }

  /**
   * @deprecated pass data to constructor instead
   * @param {string} path
   * @returns {Destination}
   */
  @deprecated('pass data to constructor instead')
  setPath(path) {
    this.path = path;
    this.directory = null;
    return this;
  }

  /**
   * @deprecated pass data to constructor instead
   * @param {string} directory
   * @returns {Destination}
   */
  @deprecated('pass data to constructor instead')
  setDirectory(directory) {
    this.directory = directory;
    this.path = null;
    return this;
  }

  /**
   * @deprecated pass data to constructor instead
   * @param {string} acl
   * @returns {Destination}
   */
  @deprecated('pass data to constructor instead')
  setAcl(acl) {
    this.acl = acl;
    return this;
  }

  /**
   * @param data
   * @private
   */
  deserialize(data: IDestination) {
    this.path = data.path ? data.path : null;
    this.directory = data.directory ? data.directory : null;
    if (data.acl) {
      this.acl = data.acl;
    }
  }
}
