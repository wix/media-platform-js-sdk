var request = require('request');
var LRU = require('lru-cache');
var jwt = require('jsonwebtoken');
var crypto = require('crypto');
var _ = require('underscore');

/**
 * @summary Creates a client that can authenticate against WixMP
 * @param {AuthenticationConfiguration} authenticationConfiguration
 * @constructor
 */
function AuthenticationFacade(authenticationConfiguration) {

    /**
     * @type {AuthenticationConfiguration}
     */
    this.authenticationConfiguration = authenticationConfiguration;

    this.cache = LRU({
        maxAge: 1000 * 60 * 20,
        max: 10000
    });
}

/**
 * @param {string} id
 * @param {function(Error, *)} callback
 */
AuthenticationFacade.prototype.getHeader = function(id, callback) {
    this.getToken(id, function(error, token) {

        if (error) {
            callback(error, null);
            return;
        }

        callback(null, {
            Authorization: 'MCLOUDTOKEN ' + token
        });
    });
};

/**
 * @param {string} id
 * @param {{}?} additionalClaims
 * @returns {{}} The self signed authentication header
 */
AuthenticationFacade.prototype.getSelfSignedHeader = function(id, additionalClaims) {
    var token = this.getSelfSignedToken(id, additionalClaims);
    return {
        Authorization: 'APP ' + token
    };
};

/**
 * @summary Retrieves a token for use authentication against REST APIs for WixMP services
 * @param {string} userId
 * @param {function(Error, string|null)} callback The callback to accept the auth token, or an error
 */
AuthenticationFacade.prototype.getToken = function(userId, callback) {

    var token = this.cache.get(userId);
    if (token) {
        callback(null, token);
        return;
    }

    var headers = this.getSelfSignedHeader(userId);

    var url = 'https://' + this.authenticationConfiguration.host + this.authenticationConfiguration.path;
    request.get({ url: url, headers: headers, json: true }, function (error, response, body) {

        if (error) {
            callback(error, null);
            return;
        }

        if (response.statusCode !== 200) {
            callback(new Error(JSON.stringify(response.body)), null);
            return;
        }

        this.cache.set(userId, body.token);
        callback(null, body.token);
    }.bind(this));
};

/**
 * @param {string} userId
 */
AuthenticationFacade.prototype.invalidateToken = function (userId) {
    this.cache.del(userId);
};

/**
 * @summary Retrieves a provisional token for use authentication against REST APIs for WixMP services
 * @param {string} userId
 * @param {{}?} additionalClaims
 * @returns {{}} The authentication header containing a self signed token
 */
AuthenticationFacade.prototype.getSelfSignedToken = function(userId, additionalClaims) {
    var claims = {
        sub: 'user:' + userId,
        iss: 'app:' + this.authenticationConfiguration.appId,
        iat: Math.floor(new Date().getTime()/1000) - 10,
        jti: crypto.randomBytes(6).toString('hex'),
        exp: Math.round(new Date().getTime()/1000) + 60
    };
    if (additionalClaims) {
        _.extendOwn(claims, additionalClaims);
    }

    return jwt.sign(claims, this.authenticationConfiguration.sharedSecret);
};

/**
 * @type {AuthenticationFacade}
 */
module.exports = AuthenticationFacade;