import {Job} from '../job/job';

/**
 * Transcode Job Response interface
 * @doc TranscodeJobResponse
 */
export interface ITranscodeJobResponse {
  jobs: Job[];
  groupId: string;
}

/**
 * Transcode Job Response
 * @doc TranscodeJobResponse
 */
export class TranscodeJobResponse {
  public jobs: Job[] = [];
  public groupId: string | null = null;

  constructor(data?: ITranscodeJobResponse) {
    if (data) {
      this.deserialize(data);
    }
  }

  /**
   * @param data
   * @private
   */
  deserialize(data: ITranscodeJobResponse) {
    this.groupId = data.groupId;
    this.jobs = data.jobs.map(function (job) {
      return new Job(job);
    });
  }
}

