import {IConfigurationBase} from '../../../platform/configuration/configuration';

export class Configuration implements IConfigurationBase {
  constructor(public domain: string, public authenticationUrl: string) {
  }
}
