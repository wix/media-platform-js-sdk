import { IExtractPosterSpecification } from '../job/extract-poster-specification';
import { IJob, Job } from '../job/job';

export interface IExtractPosterJobResponse {
  groupId: string;
  jobs: IJob<IExtractPosterSpecification>[];
}

export class ExtractPosterJobResponse {
  public groupId: string | null = null;
  public jobs: Job<IExtractPosterSpecification>[] | null = [];

  constructor(data: IExtractPosterJobResponse) {
    this.groupId = data.groupId;
    this.jobs = data.jobs.map((job) => new Job(job));
  }
}
