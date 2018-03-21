import {IJob, Job} from '../job/job';

export interface IExtractPosterJobResponse {
    groupId: string;
    jobs: IJob[];
}

export class ExtractPosterJobResponse {
    public groupId: string | null = null;
    public jobs: Job[] | null = [];

    constructor(data?: IExtractPosterJobResponse) {
    if (data) {
        this.deserialize(data);
    }
}

/**
 * @param data
 * @private
 */
deserialize(data: IExtractPosterJobResponse) {
    this.groupId = data.groupId;
    this.jobs = data.jobs.map(function (job) {
        return new Job(job);
    });
}
}

