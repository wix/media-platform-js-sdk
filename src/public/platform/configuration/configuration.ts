import { IConfigurationBase } from '../../../platform/configuration/configuration';

/**
 * browser configuration
 * @doc Configuration
 */
export class Configuration implements IConfigurationBase {
  constructor(
    public domain: string,
    public authenticationUrl: string,
    public authenticationHeaders?: Map<string, string>,
  ) {}
}
