import { IConfigurationBase } from '../configuration/configuration';
import { IHTTPClient } from '../http/http-client';
import { ImageToken } from '../../image/token/image-token';
import { Authenticator } from '../authentication/authenticator';
import { NS } from '../authentication/NS';
import { ImageManager } from './image-manager';

/**
 * @param {Configuration} configuration
 * @param {HTTPClient} httpClient
 * @constructor
 */

export class ServerImageManager extends ImageManager {
  constructor(
    public configuration: IConfigurationBase,
    public httpClient: IHTTPClient,
    private readonly authenticator?: Authenticator,
  ) {
    super(configuration, httpClient)
  }

  newImageToken(): ImageToken {
    if (typeof this.authenticator === 'undefined') {
      throw new Error('image tokens are not supported in the browser');
    }
    return new ImageToken()
      .setIssuer(NS.APPLICATION, this.authenticator.configuration.appId)
      .setSubject(NS.APPLICATION, this.authenticator.configuration.appId);
  }

  signToken(imageToken: ImageToken) {
    if (typeof this.authenticator === 'undefined') {
      throw new Error('image tokens are not supported in the browser');
    }

    return this.authenticator.encode(imageToken);
  }
}
