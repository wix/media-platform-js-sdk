import {ISource, Source} from '../job/source';
import {ITranscodeSpecification, TranscodeSpecification} from '../job/transcode-specification';
import {deprecated} from 'core-decorators';

export interface ITranscodeRequest {
  sources?: ISource[];
  specifications?: ITranscodeSpecification[];
}

/**
 * Transcode Request
 * @doc TranscodeRequest
 */
export class TranscodeRequest implements ITranscodeRequest {
  public sources: Source[] = [];
  public specifications: TranscodeSpecification[] = [];

  constructor({sources, specifications}: ITranscodeRequest = {}) {
    if (sources) {
      this.sources = sources.map(sourceData => new Source(sourceData));
    }
    if (specifications) {
      this.specifications = specifications.map(specification => new TranscodeSpecification(specification));
    }
  }

  /**
   * @deprecated pass data to constructor instead
   * @param sources
   * @returns {TranscodeRequest}
   */
  @deprecated('pass data to constructor instead')
  setSources(sources: Source[]): this {
    this.sources = sources;
    return this;
  }

  /**
   * @deprecated pass data to constructor instead
   * @param specifications
   * @returns {TranscodeRequest}
   */
  @deprecated('pass data to constructor instead')
  setSpecifications(specifications: TranscodeSpecification[]): this {
    this.specifications = specifications;
    return this;
  }

  /**
   * @param source
   * @returns {TranscodeRequest}
   */
  addSource(source: Source): this {
    this.sources.push(source);
    return this;
  }

  /**
   * @param specification
   * @returns {TranscodeRequest}
   */
  addSpecification(specification: TranscodeSpecification): this {
    this.specifications.push(specification);
    return this;
  }
}
