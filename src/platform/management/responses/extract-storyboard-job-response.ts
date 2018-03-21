import {IJob, Job} from '../job/job';

export interface IExtractStoryboardJobResponse {
    groupId: string;
    jobs: IJob[];
}

export class ExtractStoryboardJobResponse {
    public jobs: Job[] | null = [];
    public groupId: string | null = null;

    constructor(data?: IExtractStoryboardJobResponse) {
        if (data) {
            this.deserialize(data);
        }
    }

    /**
     * @param data
     * @private
     */
    deserialize(data: IExtractStoryboardJobResponse) {
        this.groupId = data.groupId;
        this.jobs = data.jobs.map(function (job) {
            return new Job(job);
        });
    }
}

