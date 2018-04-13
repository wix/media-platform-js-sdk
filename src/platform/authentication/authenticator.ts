import * as jwt from 'jsonwebtoken';
import {Token} from './token';
import {NS} from './NS';
import {Configuration} from '../configuration/configuration';
import {AuthorizationHeader} from '../../types/media-platform/media-platform';

export class Authenticator {
  /**
   * @description creates a client that can authenticate against WixMP
   * @param {Configuration} configuration
   * @constructor
   * @doc Authentication
   */
  constructor(public configuration: Configuration) {
  }

  /**
   * @summary Generates a provisional authentication header
   * @param {Token?} token
   * @returns {{}} The self signed authentication header
   */
  getHeader(token?: Token | string): AuthorizationHeader {
    let t = token;
    if (!token) {
      t = new Token()
        .setIssuer(NS.APPLICATION, this.configuration.appId)
        .setSubject(NS.APPLICATION, this.configuration.appId);
    }

    return {
      Authorization: typeof t === 'string' ? t : this.encode(t)
    };
  }

  /**
   * @summary sign a JWT
   * @param {Token} token
   * @returns {string|null} The JWT payload
   */
  encode(token) {
    return jwt.sign(token.toClaims(), this.configuration.sharedSecret);
  }

  /**
   * @summary decodes a signed JWT
   * @param {string} signedToken
   * @returns {{}|null} The JWT payload
   */
  decode(signedToken) {
    try {
      return jwt.verify(signedToken, this.configuration.sharedSecret, {
        ignoreExpiration: true,
        issuer: 'urn:app:' + this.configuration.appId
      });
    } catch (error) {
      console.error(error, jwt.decode(signedToken));
      return null;
    }
  }
}
