import { AudioStream, IAudioStream } from './audio-stream';
import { AudioFormat, IAudioFormat } from './audio-format';

export interface IAudioBasicMetadata {
  audioStreams: IAudioStream[];
  format: IAudioFormat | null;
}

export class AudioBasicMetadata implements IAudioBasicMetadata {
  public audioStreams: AudioStream[] = [];
  public format: AudioFormat | null = null;

  constructor(data: IAudioBasicMetadata) {
    this.audioStreams = data.audioStreams.map(audioStream => {
      return new AudioStream(audioStream);
    });

    this.format =
      data.format === null
        ? data.format
        : new AudioFormat(data.format || undefined);
  }
}
