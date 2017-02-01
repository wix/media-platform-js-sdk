var jwt = require('jsonwebtoken');

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
 * @param {Token} token
 * @returns {{}} The self signed authentication header
 */
Authenticator.prototype.getHeader = function(token) {
    var signedToken = jwt.sign(token.toClaims(), this.configuration.sharedSecret);
    return {
        Authorization: signedToken
    };
};

/**
 * @type {Authenticator}
 */
module.exports = Authenticator;