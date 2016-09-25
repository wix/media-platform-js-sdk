var fs = require('fs');
var request = require('request');
var GetSecureURLResponse = require('../../dto/download/get-secure-url-response');

/**
 * @param {Configuration} configuration
 * @param {AuthenticatedHTTPClient} authenticatedHttpClient
 * @constructor
 */
function FileDownloader(configuration, authenticatedHttpClient) {

    /**
     * @type {AuthenticatedHTTPClient}
     */
    this.authenticatedHttpClient = authenticatedHttpClient;

    this.baseUrl = 'https://' + configuration.domain;
}

/**
 * retrieve a pre signed URL to which the file is uploaded
 * @param {string} userId
 * @param {GetSecureURLRequest} getSecureURLRequest
 * @param {function(Error, GetSecureURLResponse[])} callback
 */
FileDownloader.prototype.getSecureUrls = function (userId, getSecureURLRequest, callback) {

    var additionalClaims = getSecureURLRequest.toParams();

    this.authenticatedHttpClient.selfSignedJsonRequest('POST', this.baseUrl + '/secure-files/' + getSecureURLRequest.fileId + '/tickets/create', userId, additionalClaims, {}, function (error, body) {

        if (error) {
            callback(error, null);
            return;
        }

        var urls = body.map(function (item) {
            return new GetSecureURLResponse(item);
        });

        callback(null, urls)
    })
};

/**
 * @type {FileDownloader}
 */
module.exports = FileDownloader;