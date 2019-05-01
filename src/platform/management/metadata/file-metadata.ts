import { MediaType } from '../../../types/media-platform/media-platform';

import {
  AudioBasicMetadata,
  IAudioBasicMetadata,
} from './audio-basic-metadata';
import {
  AudioExtraMetadata,
  IAudioExtraMetadata,
} from './audio-extra-metadata';
import { FileDescriptor, IFileDescriptor } from './file-descriptor';
import {
  IImageBasicMetadata,
  ImageBasicMetadata,
} from './image-basic-metadata';
import { IImageFeatures, ImageFeatures } from './image-features';
import {
  IVideoBasicMetadata,
  VideoBasicMetadata,
} from './video-basic-metadata';

export interface IFileMetadata {
  fileDescriptor: IFileDescriptor | null;
  mediaType: MediaType | null;
  basic: IImageBasicMetadata | IVideoBasicMetadata | IAudioBasicMetadata | null;
  features: IImageFeatures | null;
  extra: IAudioExtraMetadata | null;
}

export class FileMetadata implements IFileMetadata {
  public fileDescriptor: FileDescriptor | null = null;
  public mediaType: MediaType | null = null;
  public basic:
    | ImageBasicMetadata
    | VideoBasicMetadata
    | AudioBasicMetadata
    | null = null;
  public features: ImageFeatures | null = null;
  public extra: AudioExtraMetadata | null = null;

  constructor(data: Partial<IFileMetadata>) {
    if (!data.fileDescriptor) {
      return;
    }

    this.fileDescriptor = new FileDescriptor(data.fileDescriptor || undefined);
    this.mediaType = data.mediaType || null;

    if (data.basic) {
      switch (this.mediaType) {
        case MediaType.Image:
          this.basic = new ImageBasicMetadata(
            data.basic as IImageBasicMetadata,
          );
          break;

        case MediaType.Video:
          this.basic = new VideoBasicMetadata(
            data.basic as IVideoBasicMetadata,
          );
          break;

        case MediaType.Audio:
          this.basic = new AudioBasicMetadata(
            data.basic as IAudioBasicMetadata,
          );
          break;

        // TODO
        // case MediaType.Font:
        //   this.basic = new FontBasicMetadata(
        //       data.basic as IFontBasicMetadata,
        //   );
        //   break;

        default:
          return;
      }
    }

    if (data.features) {
      switch (this.mediaType) {
        case MediaType.Image:
          this.features = new ImageFeatures(data.features);
          break;

        default:
          return;
      }
    }

    if (data.extra) {
      switch (this.mediaType) {
        case MediaType.Audio:
          this.extra = new AudioExtraMetadata(data.extra);
          break;

        default:
          return;
      }
    }
  }
}
