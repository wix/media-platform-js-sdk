var Job = require('../job/job');

/**
 * @constructor
 */
function ExtractPosterJobResponse(data) {

    /**
     * @type {Array<Job>}
     */
    this.jobs = [];

    /**
     * @type {string}
     */
    this.groupId = null;

    if (data) {
        this.deserialize(data);
    }
}

/**
 * @param data
 * @private
 */
ExtractPosterJobResponse.prototype.deserialize = function (data) {
    this.groupId = data.groupId;
    this.jobs = data.jobs.map(function (job) {
        return new Job(job)
    });
};

/**
 * @type {ExtractPosterJobResponse}
 */
module.exports = ExtractPosterJobResponse;