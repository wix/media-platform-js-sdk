var Destination = require('./destination');
var Video = require('./video');
var Audio = require('./audio');
var QualityRange = require('./quality-range');

/**
 * @param data
 * @constructor
 */
function TranscodeSpecification(data) {

    /**
     * @type {Destination}
     */
    this.destination = null;

    /**
     * @type {string}
     */
    this.quality = null;

    /**
     * @type {QualityRange}
     */
    this.qualityRange = null;

    /**
     * @type {Video}
     */
    this.video = null;

    /**
     * @type {Audio}
     */
    this.audio = null;

    if (data) {
        this.deserialize(data);
    }
}

/**
 * @param {Destination} destination
 * @returns {TranscodeSpecification}
 */
TranscodeSpecification.prototype.setDestination = function (destination) {
    this.destination = destination;
    return this;
};

/**
 * @param {QualityRange} qualityRange
 * @returns {TranscodeSpecification}
 */
TranscodeSpecification.prototype.setQualityRange = function (qualityRange) {
    this.qualityRange = qualityRange;
    return this;
};

/**
 * @param data
 * @private
 */
TranscodeSpecification.prototype.deserialize = function (data) {
    this.destination = new Destination(data.destination);
    this.quality = data.quality;
    this.qualityRange = new QualityRange(data.qualityRange);
    this.video = new Video(data.video);
    this.audio = new Audio(data.audio);
};

/**
 * @type {TranscodeSpecification}
 */
module.exports = TranscodeSpecification;