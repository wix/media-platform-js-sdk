import {IVideoStream, VideoStream} from './video-stream';
import {AudioStream, IAudioStream} from './audio-stream';
import {IVideoFormat, VideoFormat} from './video-format';

export interface IVideoBasicMetadata {
  interlaced: boolean;
  videoStreams: IVideoStream[];
  audioStreams: IAudioStream[];
  format: IVideoFormat;
}

export class VideoBasicMetadata {
  public interlaced: boolean | null = null;
  public videoStreams: VideoStream[] | null = null;
  public audioStreams: AudioStream[] | null = null;
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
    this.format = new VideoFormat(data.format);
  }
}
