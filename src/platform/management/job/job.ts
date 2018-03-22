import {ISource, Source} from './source';
import {ExtractArchiveSpecification, IExtractArchiveSpecification} from './extract-archive-specification';
import {CreateArchiveSpecification, ICreateArchiveSpecification} from './create-archive-specification';
import {FileImportSpecification, IFileImportSpecification} from './file-import-specification';
import {ITranscodeSpecification, TranscodeSpecification} from './transcode-specification';
import {ExtractPosterSpecification, IExtractPosterSpecification} from './extract-poster-specification';
import {ExtractStoryboardSpecification, IExtractStoryboardSpecification} from './extract-storyboard-specification';

export interface IJob {
  id: string;
  type: string;
  issuer: string;
  status: string;
  groupId: string;
  dateCreated: string;
  dateUpdated: string;
  sources: ISource[];
  result;
  specification: IExtractArchiveSpecification | ICreateArchiveSpecification | ITranscodeSpecification | IFileImportSpecification | IExtractPosterSpecification | IExtractStoryboardSpecification;
}

export class Job {
  public id: string | null = null;
  public type: string | null = null;
  public issuer: string | null = null;
  public status: string | null = null;
  public groupId: string | null = null;
  public dateCreated: string | null = null;
  public dateUpdated: string | null = null;
  public sources: Source[] = [];
  public result;
  public specification: IExtractArchiveSpecification | ICreateArchiveSpecification | ITranscodeSpecification | IFileImportSpecification | IExtractPosterSpecification | IExtractStoryboardSpecification | null;

  constructor(data?: IJob) {
    if (data) {
      this.deserialize(data);
    }
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
    switch (this.type) {
      case 'urn:job:archive.extract':
        this.result = data.result;
        this.specification = new ExtractArchiveSpecification(data.specification as IExtractArchiveSpecification);
        break;
      case 'urn:job:archive.create':
        this.result = data.result;
        this.specification = new CreateArchiveSpecification(data.specification as ICreateArchiveSpecification);
        break;
      case 'urn:job:av.transcode':
        this.result = data.result;
        this.specification = new TranscodeSpecification(data.specification as ITranscodeSpecification);
        break;
      case 'urn:job:av.poster':
        this.result = data.result;
        this.specification = new ExtractPosterSpecification(data.specification as IExtractPosterSpecification);
        break;
      case 'urn:job:av.storyboard':
        this.result = data.result;
        this.specification = new ExtractStoryboardSpecification(data.specification as IExtractStoryboardSpecification);
        break;
      case 'urn:job:import.file':
        this.result = data.result;
        this.specification = new FileImportSpecification(data.specification as IFileImportSpecification);
        break;
    }
    this.dateCreated = data.dateCreated;
    this.dateUpdated = data.dateUpdated;
  }
}

