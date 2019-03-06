import { ISource, Source } from '../job/source';
import {
  ITranscodeSpecification,
  TranscodeSpecification,
} from '../job/transcode-specification';

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

  constructor({ sources, specifications }: ITranscodeRequest = {}) {
    if (sources) {
      this.sources = sources.map(sourceData => new Source(sourceData));
    }

    if (specifications) {
      this.specifications = specifications.map(
        specification => new TranscodeSpecification(specification),
      );
    }
  }
}
