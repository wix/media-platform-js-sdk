/**
 * @constructor
 */
function ImportFileRequest() {

    /**
     * @type {string}
     */
    this.sourceUrl = null;

    /**
     * @type {ExternalAuthorization}
     */
    this.externalAuthorization = null;

    /**
     * @type {Destination}
     */
    this.destination = null;
}

/**
 * @param {string} sourceUrl
 * @returns {ImportFileRequest}
 */
ImportFileRequest.prototype.setSourceUrl = function (sourceUrl) {
    this.sourceUrl = sourceUrl;
    return this;
};

/**
 * @param {ExternalAuthorization} externalAuthorization
 * @returns {ImportFileRequest}
 */
ImportFileRequest.prototype.setExternalAuthorization = function (externalAuthorization) {
    this.externalAuthorization = externalAuthorization;
    return this;
};

/**
 * @param {Destination} destination
 * @returns {ImportFileRequest}
 */
ImportFileRequest.prototype.setDestination = function (destination) {
    this.destination = destination;
    return this;
};

/**
 * @type {ImportFileRequest}
 */
module.exports = ImportFileRequest;