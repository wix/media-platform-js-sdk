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
     * TODO: WIXTENANT -> PROVIDER
     */
    PROVIDER: 'WIXTENANT',
    /**
     * @type {string}
     * TODO: WIX -> APP
     */
    APP: 'WIX'
};

/**
 * @type {{PROVIDER: string, APP: string}}
 */
module.exports = ServiceMode;