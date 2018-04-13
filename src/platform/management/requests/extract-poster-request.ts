import {ISource, Source} from '../job/source';
import {ExtractPosterSpecification, IExtractPosterSpecification} from '../job/extract-poster-specification';
import {deprecated} from 'core-decorators';

export interface IExtractPosterRequest {
  sources?: ISource[];
  specifications?: IExtractPosterSpecification[];
}

export class ExtractPosterRequest implements IExtractPosterRequest {
  public sources: Source[] = [];
  public specifications: ExtractPosterSpecification[] = [];

  constructor({sources, specifications}: IExtractPosterRequest = {}) {
    if (sources) {
      this.sources = sources.map(sourceData => new Source(sourceData));
    }
    if (specifications) {
      this.specifications = specifications.map(specificationData => new ExtractPosterSpecification(specificationData));
    }
  }

  /**
   * @deprecated pass data to constructor instead
   * @param sources
   * @returns {ExtractPosterRequest}
   */
  @deprecated('pass data to constructor instead')
  setSources(sources: Source[]): this {
    this.sources = sources;
    return this;
  }

  /**
   * @deprecated pass data to constructor instead
   * @param {array} specifications
   * @returns {ExtractPosterRequest}
   */
  @deprecated('pass data to constructor instead')
  public setSpecifications(specifications: ExtractPosterSpecification[]): this {
    this.specifications = specifications;
    return this;
  };

  /**
   * @param {Source} source
   * @returns {ExtractPosterRequest}
   */
  public addSource(source: Source): this {
    this.sources.push(source);
    return this;
  };

  /**
   * @param {ExtractPosterSpecification} specification
   * @returns {ExtractPosterRequest}
   */
  public addSpecification(specification: ExtractPosterSpecification): this {
    this.specifications.push(specification);
    return this;
  };
}
