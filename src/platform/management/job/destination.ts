import { ACL } from '../../../types/media-platform/media-platform';

/**
 * Destination interface
 * @doc Destination
 */

export interface IDestination {
  acl?: ACL;
  directory?: string;
  path?: string;
}

/**
 * Destination
 * @doc Destination
 */
export class Destination implements IDestination {
  public acl: ACL = ACL.PUBLIC;
  public directory?: string;
  public path?: string;

  constructor(data: IDestination) {
    if (data.acl) {
      this.acl = data.acl;
    }

    this.directory = data.directory;
    this.path = data.path;
  }
}
