import {ExtractPosterSpecification, IExtractPosterSpecification} from '../job/extract-poster-specification';
import {ISource, Source} from '../job/source';


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
}
