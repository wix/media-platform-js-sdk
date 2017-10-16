var _ = require('underscore');

/**
 * @param {string} authenticationUrl
 * @constructor
 */
function HTTPClient(authenticationUrl) {

    /**
     * @type {string}
     */
    this.authenticationUrl = authenticationUrl;

    /**
     * @type {string|null}
     */
    this.authorizationHeader = null;
}

/**
 * @param {string} httpMethod
 * @param {string} url
 * @param {{}} params
 * @param {string?} token
 * @param {function(Error, *)} callback
 */
HTTPClient.prototype.request = function (httpMethod, url, params, token, callback) {

    this.getAuthorizationHeader(function (error, header) {

        if (error) {
            callback(error, null);
            return;
        }
        var request = new XMLHttpRequest();
        var queryString = null;
        var body = null;
        switch (httpMethod) {
            case 'POST':
            case 'PUT':
                body = JSON.stringify(params);
                break;
            default:
                queryString = '';
                for (var key in params) {

                    if (typeof params[key] === 'function' || params[key] === null) {
                        continue;
                    }

                    if (queryString !== '') {
                        queryString += '&';
                    }
                    queryString += key + '=' + encodeURIComponent(params[key]);
                }
        }
        
        request.addEventListener('load', function (event) {
            var payload = null;
            try {
                payload = JSON.parse(request.responseText);
            } catch (error) {
                callback(error, null);
                return;
            }

            if (!_.includes([200, 201], request.status)) {
                callback(payload, null);
                return;
            }

            callback(null, payload);
        }.bind(this));
        request.addEventListener('error', function (event) {

            if (request.status === 403 || request.status === 401) {
                this.authorizationHeader = null;
            }

            callback(new Error(request.statusText), null);
        }.bind(this));
        request.addEventListener('abort', function (event) {
            callback(new Error(request.statusText), null);
        }.bind(this));
        
        request.open(httpMethod, queryString ? url + '?' + queryString : url);
        request.withCredentials = true;
        request.setRequestHeader('Accept', 'application/json');
        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader('Authorization', header.Authorization);
        request.send(body);
    }.bind(this))
};

/**
 * @param {function(Error, string|null)} callback
 */
HTTPClient.prototype.getAuthorizationHeader = function (callback) {

    if (this.authorizationHeader) {
        callback(null, this.authorizationHeader);
        return;
    }

    var request = new XMLHttpRequest();

    request.addEventListener('load', function (event) {
        try {
            this.authorizationHeader = JSON.parse(request.responseText);
        } catch (error) {
            callback(error, null);
            return;
        }
        callback(null, this.authorizationHeader);
    }.bind(this));
    request.addEventListener('error', function (event) {
        callback(new Error(request.statusText), null);
    }.bind(this));
    request.addEventListener('abort', function (event) {
        callback(new Error(request.statusText), null);
    }.bind(this));
    
    request.open('GET', this.authenticationUrl);
    request.withCredentials = true;
    request.setRequestHeader('Accept', 'application/json');
    request.send();
};

/**
 * @description deletes the cached authorization header
 */
HTTPClient.prototype.deauthorize = function () {
    this.authorizationHeader = null;
};

/**
 * @type {HTTPClient}
 */
module.exports = HTTPClient;