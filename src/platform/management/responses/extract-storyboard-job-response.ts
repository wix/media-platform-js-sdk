import {IExtractStoryboardSpecification} from '../job/extract-storyboard-specification';
import {IJob, Job} from '../job/job';


export interface IExtractStoryboardJobResponse {
  groupId: string;
  jobs: IJob<IExtractStoryboardSpecification>[];
}

export class ExtractStoryboardJobResponse {
  public jobs: Job<IExtractStoryboardSpecification>[] | null = [];
  public groupId: string | null = null;

  constructor(data: IExtractStoryboardJobResponse) {
    this.groupId = data.groupId;
    this.jobs = data.jobs.map(job => new Job(job));
  }
}
