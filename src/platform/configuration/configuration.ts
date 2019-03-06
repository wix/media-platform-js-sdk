export interface IConfigurationBase {
  domain: string;
}

export interface IConfiguration extends IConfigurationBase {
  sharedSecret: string;
  appId: string;
}

export class Configuration implements IConfiguration {
  /**
   * @param {string} domain
   * @param {string} sharedSecret
   * @param {string} appId
   * @constructor
   * @doc Configuration
   */
  constructor(
    public domain: string,
    public sharedSecret: string,
    public appId: string,
  ) {}
}
