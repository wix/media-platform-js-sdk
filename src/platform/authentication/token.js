import crypto from 'crypto';
import _ from 'underscore';

/**
 * @constructor
 */

class Token {
  constructor() {


    /**
     * @description the issuer of the token
     * @type {string}
     */
    this.issuer = null;

    /**
     * @description the subject of the token, prepended by a URN name space
     * @type {string}
     */
    this.subject = null;

    /**
     * @description the object on which the operation is performed
     * @type {string}
     * @deprecated incorrect representation, use objects instead
     */
    this.object = null;

    /**
     * @description a policy like objects array
     * @type {Array<Array<{}>>}
     */
    this.objects = null;

    /**
     * @description a set of target operations, if left empty all operation are covered
     * @type {Array<String>}
     */
    this.verbs = [];

    /**
     * @description the issuing time of the token in UNIX time
     * @type {number}
     */
    this.issuedAt = Math.floor(new Date().getTime() / 1000) - 10;

    /**
     * @description the token expiration in UNIX time
     * @type {number}
     */
    this.expiration = Math.round(new Date().getTime() / 1000) + 600;

    /**
     * @description a unique token id, can be used as nonce
     * @type {string}
     */
    this.tokenId = crypto.randomBytes(6).toString('hex');

    /**
     * @description additional ad-hoc claims that are added to the token
     * @type {{}}
     */
    this.additionalClaims = {};
  }


  /**
   * @description sets the issuer of the token
   * @param {string} ns
   * @param {string} identifier
   * @returns {Token}
   */
  setIssuer(ns, identifier) {

    this.issuer = ns + identifier;
    return this;
  }


  /**
   * @description sets the subject (actor) of the operation
   * @param {string} ns
   * @param {string} identifier
   * @returns {Token}
   */
  setSubject(ns, identifier) {

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
  setObject(ns, pattern) {

    this.subject = ns + pattern;
    return this;
  }


  /**
   * @description sets the object, the entity on which the action is taken
   * @param {Array<Array<{}>>} objects
   * @returns {Token}
   */
  setObjects(objects) {

    this.objects = objects;
    return this;
  }


  /**
   * @description sets the expiration in UNIX TIME
   * @param {number} expiration
   * @returns {Token}
   */
  setExpiration(expiration) {

    this.expiration = expiration;
    return this;
  }


  /**
   * @description add to the list of operations permitted by this token
   * @param {string} verbs
   * @returns {Token}
   */
  addVerbs(verbs) {

    this.verbs.concat(Array.from(arguments));
    return this;
  }


  /**
   * @description set the list of operations permitted by this token
   * @param {Array<string>} verbs
   * @returns {Token}
   */
  setVerbs(verbs) {

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
  toClaims() {


    var claims = {
      sub: this.subject,
      obj: this.objects || this.object,
      aud: this.verbs.length > 0 ? this.verbs.join(',') : null,
      iss: this.issuer,
      iat: this.issuedAt,
      jti: this.tokenId,
      exp: this.expiration
    };
    if (this.additionalClaims) {
      _.extendOwn(claims, this.additionalClaims);
    }

    return claims
  }

}


/**
 * @type {Token}
 */
export default Token;
export {Token};
