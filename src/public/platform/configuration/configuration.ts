import {IConfigurationBase} from '../../../platform/configuration/configuration';

export interface IConfigurationBrowser extends IConfigurationBase {
  authenticationUrl: string;
}

/**
 * browser configuration
 * @doc Configuration
 */
export class Configuration implements IConfigurationBrowser {
  constructor(public domain: string, public authenticationUrl: string) {
  }
}
