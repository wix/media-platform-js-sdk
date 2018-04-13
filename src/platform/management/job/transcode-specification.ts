import {Destination, IDestination} from './destination';
import {IVideo, Video} from './video';
import {Audio, IAudio} from './audio';
import {IQualityRange, QualityRange} from './quality-range';
import {deprecated} from 'core-decorators';

export interface ITranscodeSpecification {
  destination: IDestination;
  quality?: string | null;
  qualityRange?: IQualityRange | null;
  video?: IVideo | null;
  audio?: IAudio | null;
}

export class TranscodeSpecification implements ITranscodeSpecification {
  public destination: Destination;
  public quality: string | null = null;
  public qualityRange: QualityRange | null;
  public video: Video | null = null;
  public audio: Audio | null = null;

  constructor(data: ITranscodeSpecification) {
    this.deserialize(data);
  }

  /**
   * @deprecated pass data to constructor instead
   * @param {Destination} destination
   * @returns {this}
   */
  @deprecated('pass data to constructor instead')
  setDestination(destination: Destination): this {
    this.destination = destination;
    return this;
  }

  /**
   * @deprecated pass data to constructor instead
   * @param {QualityRange} qualityRange
   * @returns {this}
   */
  @deprecated('pass data to constructor instead')
  setQualityRange(qualityRange: QualityRange): this {
    this.qualityRange = qualityRange;
    return this;
  }

  /**
   * @param data
   * @private
   */
  deserialize(data: ITranscodeSpecification) {
    this.destination = new Destination(data.destination);
    this.quality = data.quality ? data.quality : null;
    this.qualityRange = new QualityRange(data.qualityRange ? data.qualityRange : {
      maximum: null,
      minimum: null
    });
    if (data.video) {
      this.video = new Video(data.video);
    }
    if (data.audio) {
      this.audio = new Audio(data.audio);
    }
  }
}
