import { IJob, Job } from '../job/job';
import { IPackagingSpecification } from '../job/packaging-specification';

export interface IPackagingJobResponse {
  groupId: string;
  jobs: IJob<IPackagingSpecification>[];
}

export class PackagingJobResponse {
  public groupId: string;
  public jobs: Job<IPackagingSpecification>[] | null = [];

  constructor(data: IPackagingJobResponse) {
    this.groupId = data.groupId;
    this.jobs = data.jobs.map((job) => new Job(job));
  }
}
