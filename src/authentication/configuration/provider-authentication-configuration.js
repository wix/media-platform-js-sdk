var util = require('util');
var BaseAuthenticationConfiguration = require('./base-authentication-configuration');
var ServiceMode = require('../service-mode');

/**
 * @param {ProviderConfiguration} providerConfiguration
 * @constructor
 */
function ProviderAuthenticationConfiguration(providerConfiguration) {
    BaseAuthenticationConfiguration.call(this, providerConfiguration, ServiceMode.PROVIDER, '/auth/user/token');
}
util.inherits(ProviderAuthenticationConfiguration, BaseAuthenticationConfiguration);

module.exports = ProviderAuthenticationConfiguration;
