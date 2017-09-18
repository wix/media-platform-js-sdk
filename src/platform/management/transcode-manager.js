var _ = require('underscore');
var TranscodeJobResponse = require('./responses/transcode-job-response');

/**
 * @param {Configuration} configuration
 * @param {HTTPClient} httpClient
 * @constructor
 */
function TranscodeManager(configuration, httpClient) {

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
    this.apiUrl = this.baseUrl + '/_api/av/transcode';

}

/**
 * @param {TranscodeRequest} transcodeRequest
 * todo: job group type
 * @param {function(Error, Object)} callback
 */
TranscodeManager.prototype.transcodeVideo = function (transcodeRequest, callback) {
    var params = {};
    _.extendOwn(params, transcodeRequest);

    this.httpClient.request('POST', this.apiUrl , params, null, function (error, response) {

        if (error) {
            callback(error, null);
            return;
        }

        callback(null, new TranscodeJobResponse(response.payload));
    });
};

module.exports = TranscodeManager;