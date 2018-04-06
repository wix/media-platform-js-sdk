import {Job} from '../job/job';

export interface ITranscodeJobResponse {
  jobs: Job[];
  groupId: string;
}

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

