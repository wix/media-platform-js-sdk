var request = require('request');
// require('request-debug')(request);

/**
 * @param {AuthenticationFacade} authenticationFacade
 * @constructor
 */
function AuthenticatedHTTPClient(authenticationFacade) {

    /**
     * @type {AuthenticationFacade}
     */
    this.authenticationFacade = authenticationFacade;
}

/**
 * @param {string} httpMethod
 * @param {string} url
 * @param {string} userId
 * @param {{}} params
 * @param {function(Error, *)} callback
 */
AuthenticatedHTTPClient.prototype.jsonRequest = function (httpMethod, url, userId, params, callback) {

    this.authenticationFacade.getHeader(userId, function (error, header) {

        if (error) {
            callback(error, null);
            return;
        }

        var options = { method: httpMethod, url: url, headers: header, json: true };

        switch (httpMethod) {
            case 'POST':
            case 'PUT':
                options.body = params;
                break;
            default:
                options.qs = params;
        }

        request(options, function (error, response, body) {

            if (error) {
                callback(error, null);
                return;
            }

            if (response.statusCode === 403 || response.statusCode === 401) {
                this.authenticationFacade.invalidateToken(userId);
            }

            if (response.statusCode < 200 || response.statusCode >= 300) {
                callback(new Error(JSON.stringify(response.body)), null);
                return;
            }

            callback(null, body);
        }.bind(this));
    }.bind(this))
};


/**
 * @param {string} httpMethod
 * @param {string} url
 * @param {string} userId
 * @param {{}} additionalClaims
 * @param {{}} params
 * @param {function(Error, *)} callback
 */
AuthenticatedHTTPClient.prototype.selfSignedJsonRequest = function (httpMethod, url, userId, additionalClaims, params, callback) {

    var header = this.getSelfSignedHeader(userId, additionalClaims);

    var options = { method: httpMethod, url: url, headers: header, json: true };

    switch (httpMethod) {
        case 'POST':
        case 'PUT':
            options.body = params;
            break;
        default:
            options.qs = params;
    }

    request(options, function (error, response, body) {

        if (error) {
            callback(error, null);
            return;
        }

        if (response.statusCode < 200 || response.statusCode >= 300) {
            callback(new Error(JSON.stringify(response.body)), null);
            return;
        }

        callback(null, body);
    }.bind(this));
};

/**
 * @param {string} url
 * @param {{}} form
 * @param {function(Error, Object)} callback
 */
AuthenticatedHTTPClient.prototype.anonymousFormDataRequest = function (url, form, callback) {
    request({ method: 'POST', url: url, formData: form, json: true }, function (error, response, body) {

        if (error) {
            callback(error, null);
            return;
        }

        if (response.statusCode < 200 || response.statusCode >= 300) {
            callback(new Error(JSON.stringify(response.body)), null);
            return;
        }

        callback(null, body);
    });
};

AuthenticatedHTTPClient.prototype.getAuthenticationHeader = function (userId, callback) {
    this.authenticationFacade.getHeader(userId, callback);
};

AuthenticatedHTTPClient.prototype.getSelfSignedHeader = function (userId, additionalClaims) {
    return this.authenticationFacade.getSelfSignedHeader(userId, additionalClaims);
};

/**
 * @type {AuthenticatedHTTPClient}
 */
module.exports = AuthenticatedHTTPClient;