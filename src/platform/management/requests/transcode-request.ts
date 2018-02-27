import {Source} from '../job/source';
import {TranscodeSpecification} from '../job/transcode-specification';

export class TranscodeRequest {
  public sources: Source[] = [];
  public specifications: TranscodeSpecification[] = [];

  /**
   * @param sources
   * @returns {TranscodeRequest}
   */
  setSources(sources: Source[]): this {
    this.sources = sources;
    return this;
  }

  /**
   * @param specifications
   * @returns {TranscodeRequest}
   */
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
