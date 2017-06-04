/**
 * @constructor
 */
function ExternalAuthorization() {

    /**
     * @type {{}}
     */
    this.headers = {};

}

/**
 * @param {string} name
 * @param {string} value
 * @returns {ExternalAuthorization}
 */
ExternalAuthorization.prototype.addHeader = function (name, value) {
    this.headers[name] = value;
    return this;
};

/**
 * @param {{}} headers
 * @returns {ExternalAuthorization}
 */
ExternalAuthorization.prototype.setHeaders = function (headers) {
    this.headers = headers;
    return this;
};

/**
 * @type {ExternalAuthorization}
 */
module.exports = ExternalAuthorization;