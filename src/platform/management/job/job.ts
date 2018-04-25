import {PackagingSpecification} from './packaging-specification';
import {ISource, Source} from './source';
import {ExtractArchiveSpecification} from './extract-archive-specification';
import {CreateArchiveSpecification} from './create-archive-specification';
import {FileImportSpecification} from './file-import-specification';
import {TranscodeSpecification} from './transcode-specification';
import {ExtractPosterSpecification} from './extract-poster-specification';
import {ExtractStoryboardSpecification} from './extract-storyboard-specification';

export interface IJob<T> {
  id: string | null;
  type: string;
  issuer: string | null;
  status: string | null;
  groupId: string | null;
  dateCreated: string | null;
  dateUpdated: string | null;
  sources: ISource[];
  result: any;
  specification: T | null;
}

export class Job<T> implements IJob<T> {
  public id: string | null = null;
  public type: string;
  public issuer: string | null = null;
  public status: string | null = null;
  public groupId: string | null = null;
  public dateCreated: string | null = null;
  public dateUpdated: string | null = null;
  public sources: Source[] = [];
  public result: any;
  public specification: T | null;

  constructor(data: IJob<T>) {
    this.deserialize(data);
  }

  isArchiveExtract(): boolean {
    return this.type === 'urn:job:archive.extract';
  }

  isArchiveCreate(): boolean {
    return this.type === 'urn:job:archive.create';
  }

  isAvTranscode(): boolean {
    return this.type === 'urn:job:av.transcode';
  }

  isAvPoster(): boolean {
    return this.type === 'urn:job:av.poster';
  }

  isAvStoryboard(): boolean {
    return this.type === 'urn:job:av.storyboard';
  }

  isImportFile(): boolean {
    return this.type === 'urn:job:import.file';
  }

  /**
   * @param data
   * @private
   */
  deserialize(data: IJob<T>) {
    this.id = data.id;
    this.type = data.type;
    this.issuer = data.issuer;
    this.status = data.status;
    this.groupId = data.groupId;
    this.result = data.result;

    if (typeof data.sources !== 'undefined') {
      this.sources = data.sources.map((source) => {
        return new Source(source);
      });
    }

    const specifications = {
      'urn:job:archive.extract': ExtractArchiveSpecification,
      'urn:job:archive.create': CreateArchiveSpecification,
      'urn:job:av.transcode': TranscodeSpecification,
      'urn:job:av.poster': ExtractPosterSpecification,
      'urn:job:av.storyboard': ExtractStoryboardSpecification,
      'urn:job:import.file': FileImportSpecification,
      'urn:job:av.package': PackagingSpecification
    };

    const Specification = specifications[this.type];
    this.specification = new Specification(data.specification);
    this.dateCreated = data.dateCreated;
    this.dateUpdated = data.dateUpdated;
  }
}
