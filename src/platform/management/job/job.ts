import { CreateArchiveSpecification } from './create-archive-specification';
import { ExtractArchiveSpecification } from './extract-archive-specification';
import { ExtractPosterSpecification } from './extract-poster-specification';
import { ExtractStoryboardSpecification } from './extract-storyboard-specification';
import { FileImportSpecification } from './file-import-specification';
import { PackagingSpecification } from './packaging-specification';
import { ISource, Source } from './source';
import { TranscodeSpecification } from './transcode-specification';
import { IndexImageSpecification } from './index-image-specification';

export interface IJob<T> {
  id: string;
  type: string;
  issuer: string | null;
  status: JobStatus;
  groupId: string | null;
  dateCreated: string | null;
  dateUpdated: string | null;
  sources: ISource[];
  result: any;
  specification: T | null;
}

export enum JobStatus {
  PENDING = 'pending',
  WORKING = 'working',
  SUCCESS = 'success',
  ERROR = 'error',
}

const specifications = {
  'urn:job:archive.extract': ExtractArchiveSpecification,
  'urn:job:archive.create': CreateArchiveSpecification,
  'urn:job:av.transcode': TranscodeSpecification,
  'urn:job:av.poster': ExtractPosterSpecification,
  'urn:job:av.storyboard': ExtractStoryboardSpecification,
  'urn:job:import.file': FileImportSpecification,
  'urn:job:av.package': PackagingSpecification,
  'urn:job:visual-search.index-image': IndexImageSpecification,
};

export class Job<T> implements IJob<T> {
  public id: string;
  public type: string;
  public issuer: string | null = null;
  public status: JobStatus = JobStatus.PENDING;
  public groupId: string | null = null;
  public dateCreated: string | null = null;
  public dateUpdated: string | null = null;
  public sources: Source[] = [];
  public result: any;
  public specification: T | null;

  constructor(data: IJob<T>) {
    this.id = data.id;
    this.type = data.type;
    this.issuer = data.issuer;
    if (data.status) {
      this.status = data.status;
    }
    this.groupId = data.groupId;
    this.result = data.result;

    if (typeof data.sources !== 'undefined') {
      this.sources = data.sources.map((source) => {
        return new Source(source);
      });
    }

    const Specification = specifications[this.type];
    this.specification = new Specification(data.specification);
    this.dateCreated = data.dateCreated;
    this.dateUpdated = data.dateUpdated;
  }

  /**
   * If job is pending or working
   * @returns {boolean}
   */
  public isWaiting(): boolean {
    return (
      this.status === JobStatus.PENDING || this.status === JobStatus.WORKING
    );
  }

  /**
   * If job has successfully finished
   * @returns {boolean}
   */
  public isSuccess(): boolean {
    return this.status === JobStatus.SUCCESS;
  }

  /**
   * If job failed
   * @returns {boolean}
   */
  public isError(): boolean {
    return this.status === JobStatus.ERROR;
  }
}
