import {ISource, Source} from './source';
import {ExtractArchiveSpecification, IExtractArchiveSpecification} from './extract-archive-specification';
import {CreateArchiveSpecification, ICreateArchiveSpecification} from './create-archive-specification';
import {FileImportSpecification, IFileImportSpecification} from './file-import-specification';
import {ITranscodeSpecification, TranscodeSpecification} from './transcode-specification';
import {ExtractPosterSpecification, IExtractPosterSpecification} from './extract-poster-specification';
import {ExtractStoryboardSpecification, IExtractStoryboardSpecification} from './extract-storyboard-specification';

export type JobSpecification =
  IExtractArchiveSpecification
  | ICreateArchiveSpecification
  | ITranscodeSpecification
  | IFileImportSpecification
  | IExtractPosterSpecification
  | IExtractStoryboardSpecification;

export interface IJob {
  id: string | null;
  type: string;
  issuer: string | null;
  status: string | null;
  groupId: string | null;
  dateCreated: string | null;
  dateUpdated: string | null;
  sources: ISource[];
  result;
  specification: JobSpecification | null;
}

export class Job implements IJob {
  public id: string | null = null;
  public type: string;
  public issuer: string | null = null;
  public status: string | null = null;
  public groupId: string | null = null;
  public dateCreated: string | null = null;
  public dateUpdated: string | null = null;
  public sources: Source[] = [];
  public result;
  public specification: JobSpecification | null;

  constructor(data?: IJob) {
    if (data) {
      this.deserialize(data);
    }
  }

  isArchiveExtract(specification: JobSpecification): specification is ExtractArchiveSpecification {
    return this.type === 'urn:job:archive.extract';
  }

  isArchiveCreate(specification: JobSpecification): specification is CreateArchiveSpecification {
    return this.type === 'urn:job:archive.create';

  }

  isAvTranscode(specification: JobSpecification): specification is TranscodeSpecification {
    return this.type === 'urn:job:av.transcode';

  }

  isAvPoster(specification: JobSpecification): specification is ExtractPosterSpecification {
    return this.type === 'urn:job:av.poster';

  }

  isAvStoryboard(specification: JobSpecification): specification is ExtractStoryboardSpecification {
    return this.type === 'urn:job:av.storyboard';

  }

  isImportFile(specification: JobSpecification): specification is FileImportSpecification {
    return this.type === 'urn:job:import.file';
  }

  /**
   * @param data
   * @private
   */
  deserialize(data: IJob) {
    this.id = data.id;
    this.type = data.type;
    this.issuer = data.issuer;
    this.status = data.status;
    this.groupId = data.groupId;
    if (typeof data.sources !== 'undefined') {
      this.sources = data.sources.map(function (source) {
        return new Source(source);
      });
    }
    this.result = data.result;
    const specifications = {
      'urn:job:archive.extract': ExtractArchiveSpecification,
      'urn:job:archive.create': CreateArchiveSpecification,
      'urn:job:av.transcode': TranscodeSpecification,
      'urn:job:av.poster': ExtractPosterSpecification,
      'urn:job:av.storyboard': ExtractStoryboardSpecification,
      'urn:job:import.file': FileImportSpecification
    };
    const Specification = specifications[this.type];
    this.specification = new Specification(data.specification);
    this.dateCreated = data.dateCreated;
    this.dateUpdated = data.dateUpdated;
  }
}

