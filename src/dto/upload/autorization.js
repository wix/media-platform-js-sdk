/**
 * @constructor
 */
function Authorization() {

    /**
     * @type {string}
     */
    this.headers = null;

    /**
     * @type {string}
     */
    this.params = null;
}

/**
 * @param {{string: string}} headers
 * @returns {Authorization}
 */
Authorization.prototype.setHeaders = function (headers) {
    this.headers = headers;
    return this;
};

/**
 * @param {string} fieldName
 * @param {string} fieldValue
 * @returns {Authorization}
 */
Authorization.prototype.addHeader = function (fieldName, fieldValue) {
    if (!this.headers) {
        this.headers = {}
    }
    this.headers[fieldName] = fieldValue;
    return this;
};

/**
 * @param {{string: string}} params
 * @returns {Authorization}
 */
Authorization.prototype.setParams = function (params) {
    this.params = params;
    return this;
};

/**
 * @param {string} paramName
 * @param {string} paramValue
 * @returns {Authorization}
 */
Authorization.prototype.addParam = function (paramName, paramValue) {
    if (!this.params) {
        this.params = {}
    }
    this.headers[paramName] = paramValue;
    return this;
};


/**
 * @returns {{}}
 */
Authorization.prototype.toParams = function () {
    return {
        headers: this.headers,
        params: this.params
    };
};


/**
 * @type {Authorization}
 */
module.exports = Authorization;