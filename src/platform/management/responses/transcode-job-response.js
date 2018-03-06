import {Job} from '../job/job';

/**
 * @constructor
 */
function TranscodeJobResponse(data) {

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
TranscodeJobResponse.prototype.deserialize = function (data) {
  this.groupId = data.groupId;
  this.jobs = data.jobs.map(function (job) {
    return new Job(job)
  });
};

/**
 * @type {TranscodeJobResponse}
 */
export default TranscodeJobResponse;
export {TranscodeJobResponse};
