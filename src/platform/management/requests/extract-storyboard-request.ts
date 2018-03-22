import {Source} from '../job/source';
import {ExtractStoryboardSpecification} from '../job/extract-storyboard-specification';

export class ExtractStoryboardRequest {
  public sources: Source[] | null = [];
  public specifications: ExtractStoryboardSpecification[] | null = [];

  /**
   * @param sources
   * @returns {ExtractStoryboardRequest}
   */
  setSources(sources: Source[]): this {
    this.sources = sources;
    return this;
  }

  /**
   * @param {array} specifications
   * @returns {ExtractStoryboardRequest}
   */
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
