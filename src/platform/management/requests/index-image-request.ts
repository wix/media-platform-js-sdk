import { ISource, Source } from '../job/source';
import {
  IIndexImageSpecification,
  IndexImageSpecification,
} from '../job/index-image-specification';
import { Callback, ICallback } from '../job/callback';

export interface IIndexImageRequest {
  source: ISource;
  specification: IIndexImageSpecification;
  jobCallback?: ICallback;
}

/**
 * Index Image Request
 * @doc IndexImageRequest
 */
export class IndexImageRequest implements IIndexImageRequest {
  public source: Source;
  public specification: IndexImageSpecification;
  public jobCallback?: Callback;

  constructor({ source, specification, jobCallback }: IIndexImageRequest) {
    this.source = new Source(source);
    this.specification = new IndexImageSpecification(specification);

    if (jobCallback) {
      this.jobCallback = new Callback(jobCallback);
    }
  }
}
