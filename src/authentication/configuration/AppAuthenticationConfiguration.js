/**
 * Created by elad on 31/05/2016.
 */
var util = require('util');
var BaseAuthenticationConfiguration = require('./BaseAuthenticationConfiguration');
var ServiceMode = require('../ServiceMode');

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