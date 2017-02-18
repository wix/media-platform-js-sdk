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
    this.authenticationHeader = null;
}

/**
 * @param {string} httpMethod
 * @param {string} url
 * @param {{}} params
 * @param {string?} token
 * @param {function(Error, *)} callback
 */
HTTPClient.prototype.request = function (httpMethod, url, params, token, callback) {

    this.getAuthenticationHeader(function (error, header) {

        if (error) {
            callback(error, null);
            return;
        }
        var request = new XMLHttpRequest();
        var urlParams = null;
        var body = null;
        switch (httpMethod) {
            case 'POST':
            case 'PUT':
                body = JSON.stringify(params);
                break;
            default:
                urlParams = '';
                for (var key in params) {
                    if (urlParams != '') {
                        urlParams += '&';
                    }
                    urlParams += key + '=' + encodeURIComponent(params[key]);
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

            if (request.status == 403 || request.status == 401) {
                this.authenticationHeader = null;
            }

            callback(new Error(request.statusText), null);
        }.bind(this));
        request.addEventListener('abort', function (event) {
            callback(new Error(request.statusText), null);
        }.bind(this));
        
        request.open(httpMethod, urlParams ? url + '?' + urlParams : url);
        request.withCredentials = true;
        request.setRequestHeader('Accept', 'application/json');
        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader('Authorization', header.payload);
        request.send(body);
    }.bind(this))
};

/**
 * @param {function(Error, *)} callback
 */
HTTPClient.prototype.getAuthenticationHeader = function (callback) {

    if (this.authenticationHeader) {
        callback(null, this.authenticationHeader);
        return;
    }

    var request = new XMLHttpRequest();

    request.addEventListener('load', function (event) {
        try {
            this.authenticationHeader = JSON.parse(request.responseText);
        } catch (error) {
            callback(error, null);
            return;
        }
        callback(null, this.authenticationHeader);
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
 * @description deletes the cached authentication header
 */
HTTPClient.prototype.deauthorize = function () {
    this.authenticationHeader = null;
};

/**
 * @type {HTTPClient}
 */
module.exports = HTTPClient;