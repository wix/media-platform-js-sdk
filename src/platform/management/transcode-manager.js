var _ = require('underscore');
var TranscodeJobResponse = require('./responses/transcode-job-response');
var ExtractPosterJobResponse = require('./responses/extract-poster-job-response');
var ExtractStoryboardJobResponse = require('./responses/extract-storyboard-job-response');

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
    this.apiUrl = this.baseUrl + '/_api/av';
}

/**
 * @param {TranscodeRequest} transcodeRequest
 * todo: job group type
 * @param {function(Error, Object)} callback
 */
TranscodeManager.prototype.transcodeVideo = function (transcodeRequest, callback) {
    var params = {};
    _.extendOwn(params, transcodeRequest);

    this.httpClient.request('POST', this.apiUrl + '/transcode' , params, null, function (error, response) {

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

    this.httpClient.request('POST', this.apiUrl + '/poster' , params, null, function (error, response) {

        if (error) {
            callback(error, null);
            return;
        }

        callback(null, new ExtractPosterJobResponse(response.payload));
    });
};


/**
 * @param {ExtractStoryboardRequest} extractStoryboardRequest
 * todo: job group type
 * @param {function(Error, Object)} callback
 */
TranscodeManager.prototype.extractStoryboard = function (extractStoryboardRequest, callback) {
    var params = {};
    _.extendOwn(params, extractStoryboardRequest);

    this.httpClient.request('POST', this.apiUrl + '/storyboard' , params, null, function (error, response) {

        if (error) {
            callback(error, null);
            return;
        }

        callback(null, new ExtractStoryboardJobResponse(response.payload));
    });
};



module.exports = TranscodeManager;