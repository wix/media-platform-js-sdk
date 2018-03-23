import * as crypto from 'crypto';
import {TokenClaims, TokenObjects} from '../../types/media-platform/media-platform';
import {deprecated} from 'core-decorators';

export class Token {
  /**
   * @description the issuer of the token
   */
  public issuer: string | null = null;
  /**
   * @description the subject of the token, prepended by a URN name space
   * @type {string}
   */
  public subject: string | null = null;

  /**
   * @description the object on which the operation is performed
   * @type {string}
   * @deprecated incorrect representation, use objects instead
   */
  public object: string | null = null;

  /**
   * @description a policy like objects array
   * @type {Array<Array<{}>>}
   */
  public objects: TokenObjects | null = null;

  /**
   * @description a set of target operations, if left empty all operation are covered
   * @type {Array<String>}
   */
  public verbs: string[] = [];

  /**
   * @description the issuing time of the token in UNIX time
   * @type {number}
   */
  public issuedAt: number = Math.floor(new Date().getTime() / 1000) - 10;

  /**
   * @description the token expiration in UNIX time
   * @type {number}
   */
  public expiration: number = Math.round(new Date().getTime() / 1000) + 600;

  /**
   * @description a unique token id, can be used as nonce
   * @type {string}
   */
  public tokenId: string = crypto.randomBytes(6).toString('hex');

  /**
   * @description additional ad-hoc claims that are added to the token
   * @type {{}}
   */
  public additionalClaims = {};

  /**
   * @description sets the issuer of the token
   * @param {string} ns
   * @param {string} identifier
   * @returns {Token}
   */
  setIssuer(ns: string, identifier: string): this {
    this.issuer = ns + identifier;
    return this;
  }

  /**
   * @description sets the subject (actor) of the operation
   * @param {string} ns
   * @param {string} identifier
   * @returns {Token}
   */
  setSubject(ns: string, identifier: string): this {
    this.subject = ns + identifier;
    return this;
  }

  /**
   * @deprecated incorrect representation, use setObjects instead
   * @description sets the object, the entity on which the action is taken
   * @param {string} ns
   * @param {string} pattern
   * @returns {Token}
   */
  @deprecated
  setObject(ns: string, pattern: string): this {
    this.subject = ns + pattern;
    return this;
  }

  /**
   * @description sets the object, the entity on which the action is taken
   * @param {Array<Array<{}>>} objects
   * @returns {Token}
   */
  setObjects(objects: TokenObjects): this {
    this.objects = objects;
    return this;
  }

  /**
   * @description sets the expiration in UNIX TIME
   * @param {number} expiration
   * @returns {Token}
   */
  setExpiration(expiration: number): this {
    this.expiration = expiration;
    return this;
  }

  /**
   * @description add to the list of operations permitted by this token
   * @param {string} verbs
   * @returns {Token}
   */
  addVerbs(verbs: string[]): this {
    this.verbs.concat(Array.from(arguments));
    return this;
  }

  /**
   * @description set the list of operations permitted by this token
   * @param {Array<string>} verbs
   * @returns {Token}
   */
  setVerbs(verbs: string[]) {
    this.verbs = verbs;
    return this;
  }

  /**
   * @description set any arbitrary claims in the token (be careful not override any of the standard claims)
   * @param {{}} additionalClaims
   * @returns {Token}
   */
  setAdditionalClaims(additionalClaims) {
    this.additionalClaims = additionalClaims;
    return this;
  }

  /**
   * @description return the JWT claims dictionary
   * @returns {{}}
   */
  toClaims(): TokenClaims {
    let claims = {
      sub: this.subject,
      obj: this.objects || this.object,
      aud: this.verbs.length > 0 ? this.verbs : null,
      iss: this.issuer,
      iat: this.issuedAt,
      jti: this.tokenId,
      exp: this.expiration
    };
    if (this.additionalClaims) {
      claims = {...claims, ...this.additionalClaims};
    }

    return claims;
  }
}
