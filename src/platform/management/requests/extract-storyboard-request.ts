import {ISource, Source} from '../job/source';
import {ExtractStoryboardSpecification, IExtractStoryboardSpecification} from '../job/extract-storyboard-specification';
import {deprecated} from 'core-decorators';

export interface IExtractStoryboardRequest {
  sources?: ISource[];
  specifications?: IExtractStoryboardSpecification[];
}

export class ExtractStoryboardRequest implements IExtractStoryboardRequest {
  public sources: Source[] = [];
  public specifications: ExtractStoryboardSpecification[] = [];

  constructor({sources, specifications}: IExtractStoryboardRequest = {}) {
    if (sources) {
      this.sources = sources.map(sourceData => new Source(sourceData));
    }
    if (specifications) {
      this.specifications = specifications.map(specificationData => new ExtractStoryboardSpecification(specificationData));
    }
  }


  /**
   * @deprecated pass data to constructor instead
   * @param sources
   * @returns {ExtractStoryboardRequest}
   */
  @deprecated('pass data to constructor instead')
  setSources(sources: Source[]): this {
    this.sources = sources;
    return this;
  }

  /**
   * @deprecated pass data to constructor instead
   * @param {array} specifications
   * @returns {ExtractStoryboardRequest}
   */
  @deprecated('pass data to constructor instead')
  public setSpecifications(specifications: ExtractStoryboardSpecification[]): this {
    this.specifications = specifications;
    return this;
  };

  /**
   * @param {Source} source
   * @returns {ExtractStoryboardRequest}
   */
  public addSource(source: Source): this {
    this.sources.push(source);
    return this;
  };

  /**
   * @param {ExtractStoryboardSpecification} specification
   * @returns {ExtractStoryboardRequest}
   */
  public addSpecification(specification: ExtractStoryboardSpecification): this {
    this.specifications.push(specification);
    return this;
  };
}
