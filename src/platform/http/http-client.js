var request = require('request');
// require('request-debug')(request);

/**
 * @param {Authenticator} authenticator
 * @constructor
 */
function HTTPClient(authenticator) {

    /**
     * @type {Authenticator}
     */
    this.authenticator = authenticator;
}

/**
 * @param {string} httpMethod
 * @param {string} url
 * @param {Token?} token
 * @param {*?} params
 * @param {function(Error, *)} callback
 */
HTTPClient.prototype.request = function (httpMethod, url, params, token, callback) {

    var header = this.authenticator.getHeader(token);

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
 * @param {Token?} token
 * @param {function(Error, *)} callback
 */
HTTPClient.prototype.postForm = function (url, form, token, callback) {

    var header = this.authenticator.getHeader(token);

    var options = { method: 'POST', url: url, formData: form, headers: header, json: true };

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
 * @type {HTTPClient}
 */
module.exports = HTTPClient;