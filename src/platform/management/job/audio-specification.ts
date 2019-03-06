import { AudioCodec, IAudioCodec } from './audio-codec';

export interface IAudioSpecification {
  channels: string | null;
  codec: IAudioCodec | null;
}

export class AudioSpecification implements IAudioSpecification {
  public channels: string | null = null;
  public codec: AudioCodec | null = null;

  constructor(data: IAudioSpecification) {
    this.channels = data.channels;
    this.codec = data.codec === null ? data.codec : new AudioCodec(data.codec);
  }
}
