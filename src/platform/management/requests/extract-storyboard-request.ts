import {
  ExtractStoryboardSpecification,
  IExtractStoryboardSpecification,
} from '../job/extract-storyboard-specification';
import { ISource, Source } from '../job/source';

export interface IExtractStoryboardRequest {
  sources?: ISource[];
  specifications?: IExtractStoryboardSpecification[];
}

export class ExtractStoryboardRequest implements IExtractStoryboardRequest {
  public sources: Source[] = [];
  public specifications: ExtractStoryboardSpecification[] = [];

  constructor({ sources, specifications }: IExtractStoryboardRequest = {}) {
    if (sources) {
      this.sources = sources.map(sourceData => new Source(sourceData));
    }

    if (specifications) {
      this.specifications = specifications.map(
        specificationData =>
          new ExtractStoryboardSpecification(specificationData),
      );
    }
  }
}
