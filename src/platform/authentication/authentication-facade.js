var request = require('request');
var LRU = require('lru-cache');
var SignedRequest = require('./http/sigend-request');

/**
 * @summary Creates a client that can authenticate against WixMP
 * @param {BaseAuthenticationConfiguration} authenticationConfiguration
 * @constructor
 */
function AuthenticationFacade(authenticationConfiguration) {

    /**
     * @type {BaseAuthenticationConfiguration}
     */
    this.authenticationConfiguration = authenticationConfiguration;

    this.cache = LRU({
        maxAge: 1000 * 60 * 20,
        max: 10000
    });
}

/**
 * @summary Retrieves a token for use authentication against REST APIs for WixMP services
 * @param {string} id
 * @param {function(Error, string|null)} callback The callback to accept the auth token, or an error
 */
AuthenticationFacade.prototype.getToken = function(id, callback) {
    
    var token = this.cache.get(id);
    if (token) {
        callback(null, token);
        return;
    }

    var host = this.authenticationConfiguration.host;
    var path = this.authenticationConfiguration.path;
    var serviceMode = this.authenticationConfiguration.serviceMode;
    var sharedSecret = this.authenticationConfiguration.sharedSecret;

    var signedRequest = new SignedRequest('GET', host, path, serviceMode, id, sharedSecret);
    var url = 'https://' + host + path;
    var headers = signedRequest.toHttpsOptions('Authorization').headers;

    request.get({ url: url, headers: headers, json: true }, function (error, response, body) {

        if (error) {
            callback(error, null);
            return;
        }

        if (response.statusCode !== 200) {
            callback(new Error(JSON.stringify(response.body)), null);
            return;
        }
        
        this.cache.set(id, body.token);
        callback(null, body.token);
    }.bind(this));
};

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

module.exports = AuthenticationFacade;