var request = require('request');
// require('request-debug')(request);
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
    var headers = signedRequest.toHttpsOptions('Authorization').headers;

    request.get({ url: url, headers: headers, json: true }, function (error, response, body) {

        if (error) {
            callback(error, null);
            return;
        }

        if (response.statusCode !== 200) {
            callback(new Error(response.body), null);
            return;
        }

        callback(null, body.token);
    });
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