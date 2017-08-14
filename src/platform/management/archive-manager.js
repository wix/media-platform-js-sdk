var Job = require('./job/job');

/**
 * @param {Configuration} configuration
 * @param {HTTPClient} httpClient
 * @constructor
 */
function ArchiveManager(configuration, httpClient) {

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
}



/**
 * @param {CreateArchiveRequest?} createArchiveRequest
 * @param {function(Error, Job)} callback
 */
ArchiveManager.prototype.createArchive = function (createArchiveRequest, callback) {
    this.httpClient.request('POST', this.baseUrl + '/_api/archive/create', createArchiveRequest, null, function (error, response) {
        if (error) {
            callback(error, null);
            return;
        }

        callback(null, new Job(response.payload));
    });
};



/**
 * @param {ExtractArchiveRequest?} extractArchiveRequest
 * @param {function(Error, Job)} callback
 */
ArchiveManager.prototype.extractArchive = function (extractArchiveRequest, callback) {
    this.httpClient.request('POST', this.baseUrl + '/_api/archive/extract', extractArchiveRequest, null, function (error, response) {
        if (error) {
            callback(error, null);
            return;
        }

        callback(null, new Job(response.payload));
    });
};


/**
 * @type {ArchiveManager}
 */
module.exports = ArchiveManager;