import {Source} from '../job/source';
import {ExtractPosterSpecification} from '../job/extract-poster-specification';

export class ExtractPosterRequest {
  public sources: Source[] | null = [];
  public specifications: ExtractPosterSpecification[] | null = [];

  /**
   * @param sources
   * @returns {ExtractPosterRequest}
   */
  setSources(sources: Source[]): this {
    this.sources = sources;
    return this;
  }

  /**
   * @param {array} specifications
   * @returns {ExtractPosterRequest}
   */
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
