/**
 * @constructor
 */
function ExtractStoryboardRequest() {

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
 * @returns {ExtractStoryboardRequest}
 */
ExtractStoryboardRequest.prototype.setSources = function (sources) {
    this.sources = sources;
    return this;
};

/**
 * @param {array} specifications
 * @returns {ExtractStoryboardRequest}
 */
ExtractStoryboardRequest.prototype.setSpecifications = function (specifications) {
    this.specifications = specifications;
    return this;
};

/**
 * @param {Source} source
 * @returns {ExtractStoryboardRequest}
 */
ExtractStoryboardRequest.prototype.addSource = function (source) {
    this.sources.push(source);
    return this;
};

/**
 * @param {ExtractStoryboardSpecification} specification
 * @returns {ExtractStoryboardRequest}
 */
ExtractStoryboardRequest.prototype.addSpecification = function (specification) {
    this.specifications.push(specification);
    return this;
};

/**
 * @type {ExtractStoryboardRequest}
 */
module.exports = ExtractStoryboardRequest;