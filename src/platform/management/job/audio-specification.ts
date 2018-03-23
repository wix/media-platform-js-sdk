import {AudioCodec, IAudioCodec} from './audio-codec';

export interface IAudioSpecification {
  channels: string | null;
  codec: IAudioCodec | null;
}

export class AudioSpecification implements IAudioSpecification {
  public channels: string | null = null;
  public codec: AudioCodec | null = null;

  constructor(data?: IAudioSpecification) {
    if (data) {
      this.deserialize(data);
    }
  }

  /**
   * @param data
   * @private
   */
  deserialize(data: IAudioSpecification) {
    this.channels = data.channels;
    this.codec = new AudioCodec(data.codec || undefined);
  }
}

