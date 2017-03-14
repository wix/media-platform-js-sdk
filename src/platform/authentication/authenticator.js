var jwt = require('jsonwebtoken');
var Token = require('./token');
var NS = require('./NS');

/**
 * @description creates a client that can authenticate against WixMP
 * @param {Configuration} configuration
 * @constructor
 */
function Authenticator(configuration) {

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
Authenticator.prototype.getHeader = function(token) {
    var t = token;
    if (!token) {
        t = new Token()
            .setIssuer(NS.APPLICATION, this.configuration.appId)
            .setSubject(NS.APPLICATION, this.configuration.appId);
    }

    return {
        Authorization: this.encode(t)
    };
};

/**
 * @summary sign a JWT
 * @param {Token} token
 * @returns {string|null} The JWT payload
 */
Authenticator.prototype.encode = function(token) {
    return jwt.sign(token.toClaims(), this.configuration.sharedSecret);
};

/**
 * @summary decodes a signed JWT
 * @param {string} signedToken
 * @returns {{}|null} The JWT payload
 */
Authenticator.prototype.decode = function(signedToken) {
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
};

/**
 * @type {Authenticator}
 */
module.exports = Authenticator;