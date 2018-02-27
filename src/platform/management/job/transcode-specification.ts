import {Destination, IDestination} from './destination';
import {IVideo, Video} from './video';
import {Audio, IAudio} from './audio';
import {IQualityRange, QualityRange} from './quality-range';

export interface ITranscodeSpecification {
  destination: IDestination;
  quality: string;
  qualityRange: IQualityRange;
  video: IVideo;
  audio: IAudio;
}

export class TranscodeSpecification {
  public destination: Destination | null = null;
  public quality: string | null = null;
  public qualityRange: QualityRange | null = null;
  public video: Video | null = null;
  public audio: Audio | null = null;

  constructor(data?: ITranscodeSpecification) {
    if (data) {
      this.deserialize(data);
    }
  }

  setDestination(destination: Destination): this {
    this.destination = destination;
    return this;
  }

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
    this.quality = data.quality;
    this.qualityRange = new QualityRange(data.qualityRange);
    this.video = new Video(data.video);
    this.audio = new Audio(data.audio);
  }
}
