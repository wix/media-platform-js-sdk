import {deprecated} from 'core-decorators';

/**
 * Destination interface
 * @doc Destination
 */

export enum DestinationAcl {
  PRIVATE = 'private',
  PUBLIC = 'public'
}

export interface IDestination {
  path?: string | null;
  directory?: string | null;
  acl?: DestinationAcl;
}

/**
 * Destination
 * @doc Destination
 */
export class Destination implements IDestination {
  public path: string | null = null;
  public directory: string | null = null;
  public acl: DestinationAcl = DestinationAcl.PUBLIC;

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
