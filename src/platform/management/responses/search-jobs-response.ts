import {IJob, Job} from '../job/job';

/**
 * Search Jobs Response interface
 * @doc SearchJobsResponse
 */
export interface ISearchJobsResponse {
  nextPageToken: string;
  jobs: IJob<any>[];
}

/**
 * Search Jobs Response
 * @doc SearchJobsResponse
 */
export class SearchJobsResponse {
  public nextPageToken: string | null = null;
  public jobs: Job<any>[] | null = [];

  constructor(data: ISearchJobsResponse) {
    this.deserialize(data);
  }

  /**
   * @param data
   * @private
   */
  deserialize(data: ISearchJobsResponse) {
    this.nextPageToken = data.nextPageToken;
    this.jobs = data.jobs.map((job) => {
      return new Job(job);
    });
  }
}
