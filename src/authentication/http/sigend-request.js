var util = require('util');
var crypto = require('crypto');
var WixAuth = require('wix-auth-hmac');

var WIX_NONCE = 'x-wix-auth-nonce';
var WIX_TS = 'x-wix-auth-ts';

var Options = WixAuth.Options;
var HMACAuthRequest = WixAuth.HMACAuthRequest;

/**
 * @param {string} method
 * @param {string} host
 * @param {string} path
 * @param {ServiceMode} mode
 * @param {string} id
 * @param {string} secret
 * @constructor
 * @extends {WixAuth.HMACAuthRequest}
 */
function SignedRequest(method, host, path, mode, id, secret) {
    HMACAuthRequest.call(this, host, method, path, secret);
    
    this.options(Options.HMAC_SCHEMA,  WixAuth.Algorithms.SHA256);
    this.options(Options.PATH_PRIORITY,  true);
    this.options(Options.TRAILING_NEWLINE,  false);
    this.options(Options.WITH_PARAM_VALUES,  true);
    this.options(Options.WEBSAFE_B64, true);
    this.options(Options.PAD_B64, true);
    this.asHeaders("x-wix-");
    this.withHeader(WIX_NONCE, this.nonce());
    this.withHeader(WIX_TS, this.utc());

    /**
     * @type {string}
     */
    this.id = id;

    /**
     * @type {ServiceMode}
     */
    this.mode = mode;
}
util.inherits(SignedRequest, HMACAuthRequest);

/**
 * @param signature
 * @returns {string}
 * @override
 * @private
 */
SignedRequest.prototype.toRequestAuth = function(signature) {
    return this.mode + ' ' + this.id + ':' + signature;
};

/**
 * @returns {string}
 * @private
 */
SignedRequest.prototype.nonce = function() {
    //TODO: crypto? slow! shouldn't regular Math.random suffice?
    return crypto.randomBytes(6).toString('hex');
};

/**
 * @returns {string}
 * @private
 */
SignedRequest.prototype.utc = function() {
    return new Date().toISOString();
};

module.exports = SignedRequest;