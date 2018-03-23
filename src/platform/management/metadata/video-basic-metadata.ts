import {IVideoStream, VideoStream} from './video-stream';
import {AudioStream, IAudioStream} from './audio-stream';
import {IVideoFormat, VideoFormat} from './video-format';

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

  constructor(data?: IVideoBasicMetadata) {
    if (data) {
      this.deserialize(data);
    }
  }

  /**
   * @param data
   * @private
   */
  deserialize(data: IVideoBasicMetadata) {
    this.interlaced = data.interlaced;
    this.videoStreams = data.videoStreams.map(function (videoStream) {
      return new VideoStream(videoStream);
    });
    this.audioStreams = data.audioStreams.map(function (audioStream) {
      return new AudioStream(audioStream);
    });
    this.format = new VideoFormat(data.format || undefined);
  }
}
