/**
 * @constructor
 */
function ExtractPosterRequest() {

    /**
     * @type {array}
     */
    this.sources = [];

    /**
     * @type {array}
     */
    this.specifications = [];

}

/**
 * @param {array} sources
 * @returns {ExtractPosterRequest}
 */
ExtractPosterRequest.prototype.setSources = function (sources) {
    this.sources = sources;
    return this;
};

/**
 * @param {array} specifications
 * @returns {ExtractPosterRequest}
 */
ExtractPosterRequest.prototype.setSpecifications = function (specifications) {
    this.specifications = specifications;
    return this;
};

/**
 * @param {Source} source
 * @returns {ExtractPosterRequest}
 */
ExtractPosterRequest.prototype.addSource = function (source) {
    this.sources.push(source);
    return this;
};

/**
 * @param {ExtractPosterSpecification} specification
 * @returns {ExtractPosterRequest}
 */
ExtractPosterRequest.prototype.addSpecification = function (specification) {
    this.specifications.push(specification);
    return this;
};

/**
 * @type {ExtractPosterRequest}
 */
module.exports = ExtractPosterRequest;