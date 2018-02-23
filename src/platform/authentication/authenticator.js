import jwt from 'jsonwebtoken';
import {Token} from './token';
import {NS} from './NS';

/**
 * @description creates a client that can authenticate against WixMP
 * @param {Configuration} configuration
 * @constructor
 */

class Authenticator {
  constructor(configuration) {
    /**
     * @type {Configuration}
     */
    this.configuration = configuration;
  }

  /**
   * @summary Generates a provisional authentication header
   * @param {Token?} token
   * @returns {{}} The self signed authentication header
   */
  getHeader(token) {
    let t = token;
    if (!token) {
      t = new Token()
        .setIssuer(NS.APPLICATION, this.configuration.appId)
        .setSubject(NS.APPLICATION, this.configuration.appId);
    }

    return {
      Authorization: this.encode(t)
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
      console.log(error);
      console.log(jwt.decode(signedToken));
      return null;
    }
  }
}

/**
 * @type {Authenticator}
 */
export default Authenticator;
export {Authenticator};
