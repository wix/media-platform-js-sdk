var Destination = require('./destination');
var Video = require('./video');
var Audio = require('./audio');
var QualityRange = require('./quality-range');

/**
 * @param data
 * @constructor
 */
function TranscodeSpecification(data) {

    this.destination = null;

    this.quality = null;

    this.qualityRange = null;

    this.video = null;

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