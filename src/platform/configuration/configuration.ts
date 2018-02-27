export interface IConfigurationBase {
  domain: string;
}

export class Configuration implements IConfigurationBase {
  /**
   * @param {string} domain
   * @param {string} sharedSecret
   * @param {string} appId
   * @constructor
   */
  constructor(public domain: string, public sharedSecret: string, public appId: string) {
  }
}
