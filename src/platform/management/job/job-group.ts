import {IJob, Job} from './job';

export interface IJobGroup<T = any> {
  groupId: string;
  jobs: IJob<T>[];
}

// TODO: convert Job<any>[] to a more typed solution
// For this will need to move specifications to discriminated unions
export class JobGroup<T = any> implements IJobGroup<T> {
  public groupId: string;
  public jobs: Job<T>[] = [];

  constructor(data: IJobGroup) {
    this.groupId = data.groupId;
    this.jobs = data.jobs.map(jobData => new Job<T>(jobData));
  }

  public isWaiting(): boolean {
    return this.jobs.some(job => job.isWaiting());
  }

  public isError(): boolean {
    return this.jobs.some(job => job.isError());
  }

  public isSuccess(): boolean {
    return this.jobs.every(job => job.isSuccess());
  }
}
