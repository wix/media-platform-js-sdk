import {Job} from '../job/job';
import {ITranscodeSpecification} from '../job/transcode-specification';

/**
 * Transcode Job Response interface
 * @doc TranscodeJobResponse
 */
export interface ITranscodeJobResponse {
  jobs: Job<ITranscodeSpecification>[];
  groupId: string;
}

/**
 * Transcode Job Response
 * @doc TranscodeJobResponse
 */
export class TranscodeJobResponse {
  public jobs: Job<ITranscodeSpecification>[] = [];
  public groupId: string | null = null;

  constructor(data: ITranscodeJobResponse) {
    this.deserialize(data);
  }

  /**
   * @param data
   * @private
   */
  deserialize(data: ITranscodeJobResponse) {
    this.groupId = data.groupId;
    this.jobs = data.jobs.map(job =>  new Job(job));
  }
}
