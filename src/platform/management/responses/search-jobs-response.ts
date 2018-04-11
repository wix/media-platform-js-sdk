import {IJob, Job} from '../job/job';

export interface ISearchJobsResponse {
  nextPageToken: string;
  jobs: IJob[];
}

export class SearchJobsResponse {
  public nextPageToken: string | null = null;
  public jobs: Job[] | null = [];

  constructor(data?: ISearchJobsResponse) {
    if (data) {
      this.deserialize(data);
    }
  }

  /**
   * @param data
   * @private
   */
  deserialize(data: ISearchJobsResponse) {
    this.nextPageToken = data.nextPageToken;
    this.jobs = data.jobs.map(function (job) {
      return new Job(job);
    });
  }
}

