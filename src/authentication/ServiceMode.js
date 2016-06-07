/**
 * Created by elad on 31/05/2016.
 */
/**
 * @enum {String}
 * @readonly
 */
var ServiceMode = {
    /**
     * the default is Wix Media Platform provided SaaS,
     * it is possible to acquire a Wix Media Platform dedicated installation, in which case you become the provider.
     * A Provider can provision services to its own tenants
     * 
     * @type {string}
     */
    PROVIDER: 'PROVIDER',
    /**
     * @type {string}
     */
    APP: 'APP'
};

/**
 * @type {{PROVIDER: string, APP: string}}
 */
exports.ServiceMode = ServiceMode;