var needle = require('needle');
var SignedRequest = require('./http/sigend-request');

var AUTHORIZATION_HEADER = 'Authorization';

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
}

/**
 * @summary Retrieves a token for use authentication against REST APIs for WixMP services
 * @param {string} id
 * @param {function} callback The callback to accept the auth token, or an error
 */
AuthenticationFacade.prototype.getToken = function(id, callback) {

    var host = this.authenticationConfiguration.host;
    var path = this.authenticationConfiguration.path;
    var serviceMode = this.authenticationConfiguration.serviceMode;
    var sharedSecret = this.authenticationConfiguration.sharedSecret;

    var signedRequest = new SignedRequest('GET', host, path, serviceMode, id, sharedSecret);
    var url = 'https://' + host + path;
    var headers = signedRequest.toHttpsOptions(AUTHORIZATION_HEADER).headers;

    needle.get(url, {
        headers: headers
    }, function (error, response) {

        if (error) {
            callback(error, null);
            return;
        }

        callback(null, response.data.token);
    });
};

/**
 * @param {string} id
 * @param {function(Error, *)} callback
 */
AuthenticationFacade.prototype.getHeaders = function(id, callback) {

    this.getToken(id, function(error, token) {

        if (error) {
            callback(error, null);
            return;
        }

        callback(null, {
            AUTHORIZATION_HEADER: 'MCLOUDTOKEN ' + token
        });
    });
};

module.exports = AuthenticationFacade;