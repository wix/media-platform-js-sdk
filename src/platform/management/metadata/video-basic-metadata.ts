import {AudioStream, IAudioStream} from './audio-stream';
import {IVideoFormat, VideoFormat} from './video-format';
import {IVideoStream, VideoStream} from './video-stream';


export interface IVideoBasicMetadata {
  interlaced: boolean | null;
  videoStreams: IVideoStream[];
  audioStreams: IAudioStream[];
  format: IVideoFormat | null;
}

export class VideoBasicMetadata implements IVideoBasicMetadata {
  public interlaced: boolean | null = null;
  public videoStreams: VideoStream[] = [];
  public audioStreams: AudioStream[] = [];
  public format: VideoFormat | null = null;

  constructor(data: IVideoBasicMetadata) {
    this.interlaced = data.interlaced;

    this.videoStreams = data.videoStreams.map((videoStream) => {
      return new VideoStream(videoStream);
    });

    this.audioStreams = data.audioStreams.map((audioStream) => {
      return new AudioStream(audioStream);
    });

    this.format = data.format === null ? data.format : new VideoFormat(data.format || undefined);
  }
}
