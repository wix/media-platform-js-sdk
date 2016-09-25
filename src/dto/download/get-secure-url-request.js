/**
 * @constructor
 */
function GetSecureURLRequest() {

    /**
     * @type {string}
     */
    this.fileId = null;

    /**
     * @type {Array<string>}
     */
    this.encoding = [];

    /**
     * @type {string|null}
     */
    this.expiredRedirectUrl = null;

    /**
     * @type {number|null}
     */
    this.expiresIn = null;

    /**
     * @type {string|null}
     */
    this.saveAs = null;
}

/**
 * @param {string} fileId
 * @returns {GetSecureURLRequest}
 */
GetSecureURLRequest.prototype.setFileId = function (fileId) {
    this.fileId = fileId;
    return this;
};

/**
 * @param {Array<string>} encoding
 * @returns {GetSecureURLRequest}
 */
GetSecureURLRequest.prototype.setEncoding = function (encoding) {
    this.encoding = encoding;
    return this;
};

/**
 * @param {...string|Array<string>} encoding
 * @returns {GetSecureURLRequest}
 */
GetSecureURLRequest.prototype.addEncoding = function (encoding) {
    this.encoding = this.encoding.concat(Array.from(arguments));
    return this;
};

/**
 * @param {string} expiredRedirectUrl
 * @returns {GetSecureURLRequest}
 */
GetSecureURLRequest.prototype.setExpiredRedirectUrl = function (expiredRedirectUrl) {
    this.expiredRedirectUrl = expiredRedirectUrl;
    return this;
};

/**
 * @param {number} expiresIn
 * @returns {GetSecureURLRequest}
 */
GetSecureURLRequest.prototype.setExpiresIn = function (expiresIn) {
    this.expiresIn = expiresIn;
    return this;
};

/**
 * @param {string} saveAs
 * @returns {GetSecureURLRequest}
 */
GetSecureURLRequest.prototype.setSaveAs = function (saveAs) {
    this.saveAs = saveAs;
    return this;
};

/**
 * @returns {{}}
 */
GetSecureURLRequest.prototype.toParams = function () {
    return {
        encoding: this.encoding.join(),
        expiry: this.expiresIn,
        save_as: this.saveAs,
        expiration_redirect_url: this.expiredRedirectUrl
    };
};

/**
 * @type {GetSecureURLRequest}
 */
module.exports = GetSecureURLRequest;