var util = require('util');
var BaseAuthenticationConfiguration = require('./base-authentication-configuration');
var ServiceMode = require('../service-mode');

/**
 * @param {ProviderConfiguration} providerConfiguration
 * @constructor
 */
function ProviderAuthenticationConfiguration(providerConfiguration) {
    //TODO replace 'tenant' -> 'user'
    BaseAuthenticationConfiguration.call(this, providerConfiguration, ServiceMode.PROVIDER, '/auth/tenant/token');
}
util.inherits(ProviderAuthenticationConfiguration, BaseAuthenticationConfiguration);

module.exports = ProviderAuthenticationConfiguration;
