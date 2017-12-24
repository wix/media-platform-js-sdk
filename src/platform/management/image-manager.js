var FileDescriptor = require('./metadata/file-descriptor');

/**
 * @param {Configuration} configuration
 * @param {HTTPClient} httpClient
 * @constructor
 */
function ImageManager(configuration, httpClient) {

    /**
     * @type {Configuration}
     */
    this.configuration = configuration;

    /**
     * @type {HTTPClient}
     */
    this.httpClient = httpClient;

    /**
     * @type {string}
     */
    this.baseUrl = 'https://' + configuration.domain;

    /**
     * @type {string}
     */
    this.apiUrl = this.baseUrl + '/_api/images';

}

/**
 * @param {ImageOperationRequest} imageOperationRequest
 * @param {function(Error, FileDescriptor)} callback
 */
ImageManager.prototype.imageOperation = function (imageOperationRequest, callback) {
    this.httpClient.request('POST', this.apiUrl + '/operations', imageOperationRequest, null, function (error, response) {

        if (error) {
            callback(error, null);
            return;
        }

        callback(null, new FileDescriptor(response.payload));
    });
};

/**
 * @type {ImageManager}
 */
module.exports = ImageManager;