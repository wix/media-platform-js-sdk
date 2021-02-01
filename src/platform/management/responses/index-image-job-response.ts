import { IJob, Job } from '../job/job';
import { IIndexImageSpecification } from '../job/index-image-specification';

/**
 * Index Image Job Response interface
 * @doc IndexImageJobResponse
 */
export interface IIndexImageJobResponse extends IJob<IIndexImageSpecification> {}

/**
 * Index Image Job Response
 * @doc IndexImageJobResponse
 */
export class IndexImageJobResponse extends Job<IIndexImageSpecification> {}
