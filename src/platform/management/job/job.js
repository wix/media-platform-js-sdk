var Source = require('./source');
var ExtractArchiveSpecification = require('./extract-archive-specification');
var FileImportSpecification = require('./file-import-specification');
var TranscodeSpecification = require('./transcode-specification');

/**
 * @param data
 * @constructor
 */
function Job(data) {

    /**
     * @type {string}
     */
    this.id = null;

    /**
     * @type {string}
     */
    this.type = null;

    /**
     * @type {string}
     */
    this.issuer = null;

    /**
     * @type {string}
     */
    this.status = null;

    /**
     * @type {string}
     */
    this.groupId = null;

    /**
     * @type {Array<Source>}
     */
    this.sources = [];

    this.specification = null;

    this.result = null;

    /**
     * @type {string}
     */
    this.dateCreated = null;

    /**
     * @type {string}
     */
    this.dateUpdated = null;

    if (data) {
        this.deserialize(data);
    }
}

/**
 * @param data
 * @private
 */
Job.prototype.deserialize = function (data) {
    this.id = data.id;
    this.type = data.type;
    this.issuer = data.issuer;
    this.status = data.status;
    this.groupId = data.groupId;
    this.sources = data.sources.map(function (source) {
        return new Source(source)
    });
    switch (this.type) {
        case 'urn:job:archive.extract':
            this.result = data.result;
            this.specification = new ExtractArchiveSpecification(data.specification);
            break;
        case 'urn:job:av.transcode':
            this.result = data.result;
            this.specification = new TranscodeSpecification(data.specification);
            break;
        case 'urn:job:import.file':
            this.result = data.result;
            this.specification = new FileImportSpecification(data.specification);
            break;
    }
    this.dateCreated = data.dateCreated;
    this.dateUpdated = data.dateUpdated;
};

/**
 * @type {Job}
 */
module.exports = Job;