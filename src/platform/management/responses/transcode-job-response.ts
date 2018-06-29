import {Job} from '../job/job';
import {ITranscodeSpecification} from '../job/transcode-specification';
import {JobGroup} from '../job/job-group';

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
export class TranscodeJobResponse extends JobGroup<ITranscodeSpecification> {
}
