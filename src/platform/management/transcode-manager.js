var _ = require('underscore');
var TranscodeJobResponse = require('./responses/transcode-job-response');
var ExtractPosterJobResponse = require('./responses/extract-poster-job-response');

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

    /**
     * @type {string}
     */
    this.videoApiUrl = this.baseUrl + '/_api/video';

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

/**
 * @param {ExtractPosterRequest} extractPosterRequest
 * todo: job group type
 * @param {function(Error, Object)} callback
 */
TranscodeManager.prototype.extractPoster = function (extractPosterRequest, callback) {
    var params = {};
    _.extendOwn(params, extractPosterRequest);

    this.httpClient.request('POST', this.videoApiUrl + '/poster' , params, null, function (error, response) {

        if (error) {
            callback(error, null);
            return;
        }

        callback(null, new ExtractPosterJobResponse(response.payload));
    });
};



module.exports = TranscodeManager;