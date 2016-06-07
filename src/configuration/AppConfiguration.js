/**
 * Created by elad on 07/06/2016.
 */
var utils = require('utils');

var ProviderConfiguration = require('./ProviderConfiguration');
/**
 * @param {string} domain
 * @param {string} apiKey
 * @param {string} apiSecret
 * @constructor
 */
function AppConfiguration(domain, apiKey, apiSecret) {
    ProviderConfiguration.call(this, domain, apiSecret);

    /**
     * @type {string}
     */
    this.apiKey = apiKey;
}
util.inherits(AppConfiguration, ProviderConfiguration);

/**
 * @type {AppConfiguration}
 */
module.exports = AppConfiguration;