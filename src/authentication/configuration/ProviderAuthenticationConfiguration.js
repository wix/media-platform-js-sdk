/**
 * Created by elad on 31/05/2016.
 */
var util = require('util');
var BaseAuthenticationConfiguration = require('./BaseAuthenticationConfiguration');
var ServiceMode = require('../ServiceMode');

/**
 * @param {ProviderConfiguration} providerConfiguration
 * @constructor
 */
function ProviderAuthenticationConfiguration(providerConfiguration) {
    BaseAuthenticationConfiguration.call(this, providerConfiguration, ServiceMode.PROVIDER, '/auth/user/token');
}
util.inherits(ProviderAuthenticationConfiguration, BaseAuthenticationConfiguration);

module.exports = ProviderAuthenticationConfiguration;
