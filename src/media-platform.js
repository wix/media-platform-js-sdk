var ProviderConfiguration = require('./configuration/provider-configuration');

var Image = require('./image/image');

/**
 * @param configuration
 * @constructor
 */
function MediaPlatform(configuration) {

    /**
     * @type {ProviderConfiguration}
     */
    this.providerConfiguration = providerConfiguration;
}

module.exports = {
    /**
     * @type {MediaPlatform}
     */
    MediaPlatform: MediaPlatform,
    /**
     * @type {Image}
     */
    Image: Image
    
};


//
//
// /**
//  * @summary Entry point into the WixMedia service
//  * @module WixMedia
//  */
// module.exports = {
//     /**
//      * @summary Creates a {@link WixImage} object from a passed in URL
//      * @param {string} url The URL to parse
//      * @returns {WixImage} a WixImage
//      * @throws An exception if the URL was invalid
//      */
//     fromUrl : Images.fromUrl,
//     /**
//      * @summary Creates a new {@link WixImage}
//      * @param {String} baseUrl the base URL where the image is hosted
//      * @param {String} imageId the id of the image to manipulate
//      * @param {String} [version="v1"] the optional version number.
//      * @returns {WixImage} a new {@link WixImage}
// 	 * @snippet wiximage2.js Using WixImage in the browser, no AMD
// 	 * @snippet wiximage1.js Using WixImage in the browser or in node, using common.js modules
// 	 * @snippet wiximage3.js Using WixImage in the browser, using requirejs
//      */
//     WixImage : function(baseUrl, imageId, version) {
//         return new Images.WixImage(baseUrl,imageId,version);
//     },
//
//     /**
//      * @summary Image constants for use with Wix Media Services
//      * @type {Defaults}
//      */
//     Defaults : Images.Defaults,
//
// 	/**
// 	 * @summary Returns a new UploadClient. Only available in Node.js
// 	 * @param {string} apiKey - your API key
// 	 * @param {string} secretKey - your secret key
// 	 * @returns {module:WixUpload} an upload client
// 	 * @component nodejs
// 	 */
// 	uploader : function(apiKey, secretKey) {
// 		var config;
// 		if(secretKey !== undefined) {
// 			config = authconfig.authConfig(authconfig.AuthModes.WIX).apiKey(apiKey).secretKey(secretKey);
// 		} else if(typeof apiKey !== 'string') {
// 			config = apiKey;
// 		} else {
// 			throw 'Bad config';
// 		}
// 		return Uploader.client(config);
// 	},
//
// 	/**
// 	 * @summary Methods dealing with authentication when authenticating against wixmp
// 	 * @namespace WixAuth
// 	 * @memberof module:WixMedia
// 	 * @component nodejs
// 	 */
// 	auth : {
// 		/**
// 		 * @summary Config factory to create configurations
// 		 * @param {AuthModes} mode The auth mode
// 		 * @return {WixConfig|ProviderConfiguration1} A config object for use with AuthClient and uploader
// 		 * @component nodejs
// 		 * @memberof module:WixMedia.WixAuth
// 		 */
// 		config : authconfig.authConfig,
//
// 		/**
// 		 * Authentication modes used with uploading
// 		 * @component nodejs
// 		 * @memberof module:WixMedia.WixAuth
// 		 */
// 		modes: authconfig.AuthModes,
// 		/**
// 		 * @summary Creates a new AuthClient. Only available in Node.js
// 		 * @param config {AuthConfig}
// 		 * @returns {AuthClient}
// 		 * @component nodejs
// 		 * @memberof module:WixMedia.WixAuth
// 		 */
// 		client: function(config) {
// 			return new AuthClient(config);
// 		}
// 	},
//
// 	crop:{
// 		getContainLayout: crophelpers.getContainLayout,
// 		getCoverLayout: crophelpers.getCoverLayout
// 	}
// };
