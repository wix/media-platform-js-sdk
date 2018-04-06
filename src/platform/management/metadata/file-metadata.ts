import {FileDescriptor, IFileDescriptor} from './file-descriptor';
import {IImageBasicMetadata, ImageBasicMetadata} from './image-basic-metadata';
import {IVideoBasicMetadata, VideoBasicMetadata} from './video-basic-metadata';
import {IImageFeatures, ImageFeatures} from './image-features';

export interface IFileMetadata {
  fileDescriptor: IFileDescriptor | null;
  basic: IImageBasicMetadata | IVideoBasicMetadata | null;
  features: IImageFeatures | null;
}

export class FileMetadata implements IFileMetadata {
  public fileDescriptor: FileDescriptor | null = null;
  public basic: ImageBasicMetadata | VideoBasicMetadata | null = null;
  public features: ImageFeatures | null = null;

  constructor(data?: Partial<IFileMetadata>) {
    if (data) {
      this.deserialize(data);
    }
  }

  /**
   * @param data
   * @private
   */
  deserialize(data: Partial<IFileMetadata>) {
    this.fileDescriptor = new FileDescriptor(data.fileDescriptor || undefined);
    if (this.fileDescriptor === null || this.fileDescriptor.mimeType === null) {
      return;
    }
    const type = this.fileDescriptor.mimeType.split('/')[0].toLowerCase();
    if (data.basic) {
      switch (type) {
        case 'image':
          this.basic = new ImageBasicMetadata(data.basic as IImageBasicMetadata);
          break;
        case 'video':
          this.basic = new VideoBasicMetadata(data.basic as IVideoBasicMetadata);
          break;
      }
    }
    if (data.features) {
      switch (type) {
        case 'image':
          this.features = new ImageFeatures(data.features);
          break;
      }
    }
  }
}
