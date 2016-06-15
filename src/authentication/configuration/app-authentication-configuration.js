var util = require('util');
var BaseAuthenticationConfiguration = require('./base-authentication-configuration');
var ServiceMode = require('../service-mode');

/**
 * @summary used to authenticate a tenant within the provider
 * @param {AppConfiguration} appConfiguration
 * @constructor
 */
function AppAuthenticationConfiguration(appConfiguration) {
    BaseAuthenticationConfiguration.call(this, appConfiguration, ServiceMode.APP, '/auth/app/token');
}
util.inherits(AppAuthenticationConfiguration, BaseAuthenticationConfiguration);

module.exports = AppAuthenticationConfiguration;