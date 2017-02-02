var crypto = require('crypto');
var _ = require('underscore');

/**
 * @constructor
 */
function Token() {

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
     */
    this.object = null;

    /**
     * @description a set of target operations, if left empty all operation are covered
     * @type {Array<String>}
     */
    this.verbs = [];

    /**
     * @description the issuing time of the token in UNIX time
     * @type {number}
     */
    this.issuedAt = Math.floor(new Date().getTime()/1000) - 10;

    /**
     * @description the token expiration in UNIX time
     * @type {number}
     */
    this.expiration = Math.round(new Date().getTime()/1000) + 60;

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
Token.prototype.setIssuer = function(ns, identifier) {
    this.issuer = ns + identifier;
    return this;
};

/**
 * @description sets the subject (actor) of the operation
 * @param {string} ns
 * @param {string} identifier
 * @returns {Token}
 */
Token.prototype.setSubject = function(ns, identifier) {
    this.subject = ns + identifier;
    return this;
};

/**
 * @description sets the object, the entity on which the action is taken
 * @param {string} ns
 * @param {string} pattern
 * @returns {Token}
 */
Token.prototype.setObject = function(ns, pattern) {
    this.subject = ns + pattern;
    return this;
};

/**
 * @description add to the list of operations permitted by this token
 * @param {string} verbs
 * @returns {Token}
 */
Token.prototype.addVerbs = function(verbs) {
    this.verbs.concat(Array.from(arguments));
    return this;
};

/**
 * @description set the list of operations permitted by this token
 * @param {Array<string>} verbs
 * @returns {Token}
 */
Token.prototype.setVerbs = function(verbs) {
    this.verbs = verbs;
    return this;
};

/**
 * @description return the JWT claims dictionary
 * @returns {{}}
 */
Token.prototype.toClaims = function() {

    var claims = {
        sub: this.subject,
        obj: this.object,
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
};

/**
 * @type {Token}
 */
module.exports = Token;